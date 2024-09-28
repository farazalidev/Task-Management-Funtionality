/** @type {import('next').NextConfig} */
const nextConfig = {
    redirects: async () => {
        return [{ source: "/", destination: "/myworkspaces", permanent: true }]
    }
};

export default nextConfig;
