import VoteButtons from './'
import { render, screen, userEvent } from 'common/testsSuit'
import Vote from 'modules/vote/types/vote'

const props = {
  voteScore: 2,
  onVote: jest.fn()
}

const prepare = (otherProps = {}) => {
  return render(<VoteButtons {...props} {...otherProps} />)
}

describe('VoteButtons component', () => {
  it('should call onVote with "down" value', () => {
    prepare()

    const downVoteButton = screen.getByTestId('down-vote-button')
    userEvent.click(downVoteButton)

    expect(props.onVote).toHaveBeenCalledWith(Vote.DOWN)
  })

  it('should call onVote with "up" value', () => {
    prepare()

    const upVoteButton = screen.getByTestId('up-vote-button')
    userEvent.click(upVoteButton)

    expect(props.onVote).toHaveBeenCalledWith(Vote.UP)
  })

  it('should contain class passed as prop', () => {
    prepare({ className: 'testClass' })

    const component = screen.getByTestId('vote-buttons')
    expect(component).toHaveClass('testClass')
  })
})
