type Props = {
    slug: string
}

const NoCompaniesMessage = ({ slug }: Props) => {
    return (
        <div className="px-6 py-20 text-center text-gray-600">
            <h1 className="text-2xl font-semibold mb-4">No Companies Found</h1>
            <p className="text-sm text-gray-600">
                We couldn&apos;t find company data specifically linked to <strong>{slug}</strong> in our database.
                You can still use the search bar to check if the company you&apos;re looking for exists independently.
            </p>
        </div>
    )
}

export default NoCompaniesMessage