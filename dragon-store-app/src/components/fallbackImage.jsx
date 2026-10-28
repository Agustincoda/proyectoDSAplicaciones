import { useEffect, useState } from 'react';
import { Image } from 'react-native';

// Las imágenes de productos son URLs externas (hotlinks a sitios de
// terceros) que a veces caen o dejan de responder. Si eso pasa, se
// muestra el ícono de la app en vez de dejar el hueco de imagen rota.
const placeholder = require('../../assets/icon.png');

const FallbackImage = ({ uri, style, resizeMode = 'contain' }) => {
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        setFailed(false);
    }, [uri]);

    return (
        <Image
            source={!uri || failed ? placeholder : { uri }}
            style={style}
            resizeMode={resizeMode}
            onError={() => setFailed(true)}
        />
    );
};

export default FallbackImage;
