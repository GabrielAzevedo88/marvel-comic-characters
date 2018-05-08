import { Dimensions, PixelRatio } from 'react-native';

const pxRatio = PixelRatio.get();
const viewport = Dimensions.get('window');

const deviceSizes = {
    small: viewport.width < 360,
    normal: viewport.height < 667,
    large: viewport.height >=667 && viewport.height <= 735
}

const multiplier = {
    '2': {
        small: 0.95,
        normal: 1,
        large: 1.15,
        extra: 1.25
    },
    '3': {
        small: 1,
        normal: 1.15,
        large: 1.2,
        extra: 1.27
    },
    '4': {
        small: 1,
        normal: 1.20,
        large: 1.25,
        extra: 1.40
    }
}

module.exports = function normalizeSize(size) {
    if ( pxRatio < 2 ){
        return size;
    }

    let mod = 'extra';
    if ( deviceSizes.small ){ mod = 'small'; }
    if ( deviceSizes.normal ){ mod = 'normal'; }
    if ( deviceSizes.large ){ mod = 'large'; }

    return size * multiplier[Math.ceil(pxRatio)][mod];
}
