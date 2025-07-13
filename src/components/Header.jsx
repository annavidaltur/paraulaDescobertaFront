import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartSimple, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';

const Header = ({ openModalUserStats, openModalLegend }) => {
    return (
        <div className="d-flex justify-content-center align-items-center gap-3 border-bottom pb-2">            
            <Button variant="link btn-lg pb-0" onClick={openModalLegend} style={{color: '#909090'}}><FontAwesomeIcon icon={faCircleQuestion} /></Button>

            <h1 className="text-center mt-3 fs-5 ">PARAULA DESCOBERTA</h1>

            <Button variant="link btn-lg pb-0" onClick={openModalUserStats} style={{color: '#909090'}}><FontAwesomeIcon icon={faChartSimple} /></Button>
        </div>);
}

export default Header;