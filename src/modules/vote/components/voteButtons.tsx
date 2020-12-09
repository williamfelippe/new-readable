import classnames from 'classnames'

import Vote from '../types/vote'
import { Button } from 'common/components'
import {
  ChevronDown,
  ChevronUp
} from 'common/assets/icons'

interface Props {
  voteScore: number,
  onVote: (vote: Vote) => void,
  className?: string
}

const VoteButtons = ({ voteScore, onVote, className }: Props) => {
  const classes = classnames('flex items-center', className)

  return (
    <div className={classes}>
      <Button
        className="hover:text-indigo-400 transition duration-300 ease-in-out"
        onClick={() => onVote(Vote.DOWN)}>
        <ChevronDown />
      </Button>

      <span className="mx-2">{voteScore}</span>

      <Button
        className="hover:text-indigo-400 transition duration-300 ease-in-out"
        onClick={() => onVote(Vote.UP)}>
        <ChevronUp />
      </Button>
    </div>
  )
}

export default VoteButtons
