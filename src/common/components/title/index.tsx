import classnames from 'classnames'

export type TagType = 'h1' | 'h2' | 'h3' | 'h4'

interface Props {
  tag: TagType,
  title: string,
  className?: string,
  unstyled?: boolean
}

const getTextClassByTag = (tag: TagType) => {
  switch(tag) {
    case 'h1': return 'text-4xl'
    case 'h2': return 'text-3xl'
    case 'h3': return 'text-2xl'
    case 'h4': return 'text-xl'
  }
}

const getFormatedTitle = (title: string) => {
  return (
    <>
      <span className="text-indigo-400">
        {title.charAt(0)}
      </span>{title.slice(1)}
    </>
  )
}

const Title = ({ tag, title, className, unstyled = false }: Props) => {
  const classes = classnames(`text-center font-bold ${getTextClassByTag(tag)}`, className)

  const Tag = tag

  return (
    <Tag className={classes}>
      {unstyled ? title : getFormatedTitle(title)}
    </Tag>
  )
}

export default Title
