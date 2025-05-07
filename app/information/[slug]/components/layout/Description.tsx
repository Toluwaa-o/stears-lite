const Description = ({ description, section }: { description: string, section: string }) => {
    return (
        <p
            className={`text-[#D0D0D0] leading-relaxed text-base transition-all duration-200 ${section === 'info' ? 'block' : 'hidden'
                } lg:block`}
        >
            {description.length > 200
                ? description.split('. ')[0] + '.'
                : description}
        </p>
    )
}

export default Description;