

import Image from 'next/image'

const UIImage = ({ size, src, isHeroImage, className }) => {
    const sizeClasses = size === 'large' ? 'h-80 w-80 sm:h-96 sm:w-96' : 'h-64 w-64 sm:h-120 sm:w-120';

    const heroClasses = isHeroImage ?  "rounded-full" : "";
    
    return (
        <div className={`relative ${sizeClasses} ${heroClasses} overflow-hidden ${className}`}> 
                <Image
                size = "small"
                src= {src}
                alt="Picture"
                layout="fill"
                objectFit="cover"
            />
        </div>
    )
}

export default UIImage;