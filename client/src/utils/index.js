export const closeOnEsc = (e, onClose) => {
    if (e.key === 'Escape') {
        onClose();
    }
}

export const getServerAssetUrl = (path) => {
    return `${import.meta.env.VITE_SERVER_BASE_URL}/assets/${path}`
}

export const generateSource = (source, integrationId = null) => {
    return { from: source, integrationId };
}