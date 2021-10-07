import { Spinner } from 'react-bootstrap';

function Loading() {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <Spinner animation="border" role="status" variant="danger">
                
            </Spinner>
        </div>
    );
}

export default Loading;