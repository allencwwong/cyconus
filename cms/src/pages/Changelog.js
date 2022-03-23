import { Link } from 'react-router-dom'
import './changelog.css'

const ChangeLog = () => {
    return(
        <section className="changelog-wrapper">
            <button className="back-btn"><Link to="/">Back</Link></button>
            <h1>ChangeLogs</h1>
            <div className="grid">
                <div>
                    <h2>CMS</h2>
                    <ul>
                        <h2>03/22/22</h2>
                        <li>fixed form insert before issue</li>
                        <li>updated logic for <code>EditProduct</code> to fetch product + rid</li>
                        <h2>02/25/22</h2>
                        <li>form grid update</li>
                        <h2>02/17/22</h2>
                        <li>added changelog icon</li>
                        <li>updated form styling</li>
                        <li>fixed routing issues (linking)</li>
                        <h2>02/05/22</h2>
                        <li>updated ui for editing/confirmation</li>
                        <li>updated logic for storing data</li>
                        <li>hidden additional options for now</li>
                    </ul>
                </div>
                <div>
                    <h2>Frontpage</h2>
                    <ul>
                        <h2>03/22/22</h2>
                        <li>updated chair description with new copy regarding price</li>
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default ChangeLog