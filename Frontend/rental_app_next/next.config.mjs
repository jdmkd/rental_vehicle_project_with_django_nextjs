/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,  //This is a standard configuration to enforce best practices in your React components. It's optional but recommended.

    images: {
        domains: ['127.0.0.1'], // Allow images from your Django server
    },
    
    async rewrite(){
        return [
            // {
            //     source: '/apix',
            //     destination: 'http://localhost:8000/apix',
            // },
            {
                source: '/apis',
                destination: 'http://localhost:8000/contactus',
            },
        ]
    }
};

export default nextConfig;
