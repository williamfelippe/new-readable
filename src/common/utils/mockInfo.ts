
import Chance from 'chance'
import { nanoid } from 'nanoid'

class MockInfoUtil {
  static createId = () => nanoid()

  static createAuthorName = () => new Chance().name()
}

export default MockInfoUtil
