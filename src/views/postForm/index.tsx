import { useEffect, useMemo } from 'react'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { object, string } from 'yup'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import DateUtil from 'common/utils/date'
import PostService from 'modules/post/services'
import NewPost from 'modules/post/types/newPost'
import MockInfoUtil from 'common/utils/mockInfo'
import RoutesPaths from 'common/routes/routesPaths'
import { RootState } from 'common/store'
import { fetchByPostById } from 'modules/post/slice/thunks'
import { fetchCategories } from 'modules/category/slice/thunks'
import { CategoryTypes } from 'modules/category/utils/constants'
import { ArrowLeft, SaveIcon } from 'common/assets/icons'
import {
  Button,
  Container,
  ErrorRecoverState,
  InputText,
  Loader,
  Select,
  TextArea,
  Title,
  Toast
} from 'common/components'

interface FormInputs {
  title: string
  comment: string,
  category: string
}

const schema = object().shape({
  title: string().required('Title is required'),
  comment: string().required('Comment is required')
    .min(10, 'Comment should have at least 10 characters'),
  category: string().required('Category is required')
})

const PostForm = () => {
  const history = useHistory()

  const dispatch = useDispatch()

  const { postId } = useParams<Record<string, string>>()

  const {
    post,
    isLoadingPosts,
    errorOnLoadPosts
  } = useSelector((state: RootState) => {
    return {
      post: state.post.posts?.[postId],
      ...state.post
    }
  })

  const { categories } = useSelector((state: RootState) => state.category)

  const { register, handleSubmit, errors, setValue } = useForm<FormInputs>({
    resolver: yupResolver(schema),
    mode: 'onBlur'
  })

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  useEffect(() => {
    if (postId) {
      dispatch(fetchByPostById(postId))
    }
  }, [dispatch, postId])

  useEffect(() => {
    setValue('title', post?.title)
    setValue('comment', post?.body)
    setValue('category', post?.category)
  }, [post, setValue])

  const options = useMemo(() => {
    return categories
      .filter(category => category.name !== CategoryTypes.ALL)
      .map(category => ({ value: category.path, label: category.name }))
  }, [categories])

  const retryFetchs = () => {
    dispatch(fetchCategories())
    dispatch(fetchByPostById(postId))
  }

  const savePost = (payload: NewPost) => {
    return (postId)
      ? PostService.updatePost(postId, payload)
      : PostService.createPost(payload)
  }

  const creatingPostPayloadRestValues = () => {
    if (post) {
      return {
        timestamp: post.timestamp,
        author: post.author,
        id: post.id
      }
    }

    return {
      timestamp: DateUtil.now(),
      author: MockInfoUtil.createAuthorName(),
      id: postId || MockInfoUtil.createId()
    }
  }

  const onSubmit = async (data: FormInputs) => {
    const { title, comment: body, category } = data

    const payload: NewPost = {
      title,
      body,
      category,
      ...creatingPostPayloadRestValues()
    }

    const updatedPost = await savePost(payload)
    Toast.showToast('Post saved!')
    history.replace(RoutesPaths.EDIT_POST.replace(':postId', updatedPost.id))
  }

  const goBack = () => {
    history.goBack()
  }

  if(isLoadingPosts) {
    return <Loader full />
  }

  if (errorOnLoadPosts) {
    return (
      <ErrorRecoverState
        onTryAgain={retryFetchs}
        errorMessage={errorOnLoadPosts} />
    )
  }

  return (
    <Container>
      <Button
        onClick={goBack}
        className={`hover:text-indigo-400 transition
        ease-in-out duration-300`}>
        <ArrowLeft />
      </Button>

      <div className="max-w-5xl mx-auto">
        <Title
          tag="h1"
          title={postId ? 'Edit post' : 'Add post'}
          className="mb-10" />

        <p className="text-md text-gray-600 mb-16 text-center">
          {`Start writing something. It would be incredible if
           you could share some experiences with us`}
        </p>

        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}>
          <InputText
            ref={register}
            name="title"
            label="Title"
            className="mb-10"
            error={errors.title?.message} />

          <TextArea
            ref={register}
            name="comment"
            label="Comment"
            className="mb-10"
            error={errors.comment?.message} />

          <Select
            ref={register}
            name="category"
            label="Category"
            className="mb-10"
            error={errors.category?.message}
            options={options} />

          <Button
            type="submit"
            className={`bg-indigo-400 bg-black text-white text-lg py-2 px-5
            hover:ring-4 hover:ring-indigo-400`}>
            <span className="mr-3">Save</span> <SaveIcon />
          </Button>
        </form>
      </div>
    </Container>
  )
}

export default PostForm
