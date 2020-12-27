import classnames from 'classnames'

import Vote from '../../types/vote'
import {
  Button,
  Tooltip
} from 'common/components'
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
    <div data-testid="vote-buttons" className={classes}>
      <Button
        data-tip="Down vote"
        data-testid="down-vote-button"
        className="hover:text-indigo-400 transition duration-300 ease-in-out"
        onClick={() => onVote(Vote.DOWN)}>
        <ChevronDown />
      </Button>

      <span className="mx-2">{voteScore}</span>

      <Button
        data-tip="Up vote"
        data-testid="up-vote-button"
        className="hover:text-indigo-400 transition duration-300 ease-in-out"
        onClick={() => onVote(Vote.UP)}>
        <ChevronUp />
      </Button>

      <Tooltip />
    </div>
  )
}

export default VoteButtons
