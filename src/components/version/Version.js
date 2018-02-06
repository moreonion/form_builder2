import pkg from '../../pkg'
import './Version.scss'

export default {
  functional: true,
  render() {
    return <div class="version">fb2 v{pkg.version}</div>
  }
}
