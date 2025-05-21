const Footer = () => {
    return (
        <footer className="mt-20 border-t border-gray-800 py-6 text-sm text-center text-gray-500">
            © {new Date().getFullYear()} Stears Lite. Inspired by{" "}
            <a
                href="https://stears.co"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-gray-400"
            >
                Stears Africa
            </a>
            .
        </footer>
    )
}

export default Footer;