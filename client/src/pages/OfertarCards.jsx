import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './OfertarCards.css'
import { height } from '@mui/system';
import './OfertarCards.css'

function OfertarCards({ prod }) {
    return (
        <div>
            <Card  className='cards'>
                <Card.Img variant="top" src={prod.image} />
                <Card.Body>
                    <Card.Title>{prod.title}</Card.Title>
                    <Card.Text>
                        Ubicación
                    </Card.Text>

                </Card.Body>
            </Card>
            
        </div>
    );
}

export default OfertarCards;