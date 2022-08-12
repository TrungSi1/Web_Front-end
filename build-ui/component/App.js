import html from "../core.js";
import { connect } from "../store.js"

const connecter = connect()

function App({cars}) {
    return html`
    <ui>
        ${cars.map(car => `<li>${car}</li>`)}
    </ui>
    `
}

export default connecter(App)



