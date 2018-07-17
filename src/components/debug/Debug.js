import {mapState} from 'vuex'
import './Debug.scss'

import bus from '../../bus'

export default {
  data () {
    return {
      debugDropData: {}
    }
  },
  computed: {
    ...mapState('builder', ['rootNode'])
  },
  mounted () {
    bus.$on('debug-drop', payload => {
      this.debugDropData = payload
    })
  },
  render () {
    return (
      <div class="debug">
        <h4>itemInt</h4>
        <pre>{JSON.stringify(this.debugDropData.itemInt, null, 2)}</pre>
        <h4>srcResult</h4>
        <pre>{JSON.stringify(this.debugDropData.srcResult, null, 2)}</pre>
        <h4>trgResult</h4>
        <pre>{JSON.stringify(this.debugDropData.trgResult, null, 2)}</pre>
        <h4>Builder</h4>
        <pre>{JSON.stringify(this.rootNode.toString(), null, 2)}</pre>
      </div>)
  }
}
