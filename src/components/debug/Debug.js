import {mapState, mapGetters} from 'vuex'
import './Debug.scss'

export default {
  computed: {
    ...mapGetters('palette', {
      palette: 'paletteState'
    }),
    ...mapState('builder', ['rootNode'])
  },
  render() {
    return (
      <div class="debug">
        <h4>Builder</h4>
        <pre id="builder">{JSON.stringify(this.rootNode.toString(), null, 2)}</pre>
        {/* <h4>Palette</h4>
        <pre style="font-size: 8px">{JSON.stringify(this.palette, null, 2)}</pre> */}
      </div>)
  }
}
