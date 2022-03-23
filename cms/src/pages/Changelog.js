import { Link } from 'react-router-dom'
import './changelog.css'

const ChangeLog = () => {
    return(
        <section className="changelog-wrapper">
            <button className="back-btn"><Link to="/">Back</Link></button>
            <ul>
                <h2>02/17/22</h2>
                <li>added changelog icon</li>
                <li>updated form styling</li>
                <li>fixed routing issues (linking)</li>
                <h2>02/05/22</h2>
                <li>updated ui for editing/confirmation</li>
                <li>updated logic for storing data</li>
                <li>hidden additional options for now</li>
            </ul>
        </section>
    )
}

export default ChangeLog