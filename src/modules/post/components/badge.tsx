interface Props {
  category: string
}

const Badge = ({ category }: Props) => {
  return (
    <span className={`rounded-full text-sm py-1 px-2 mb-2
      self-end bg-black text-white font-bold`}>
      {category}
    </span>
  )
}

export default Badge
