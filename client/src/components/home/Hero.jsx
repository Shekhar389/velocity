import { Link } from 'react-router-dom'

const Hero = () => {
    return (
        <>
            <div className="hero bg-base-100 min-h-[70vh]">
                <div className="hero-content text-center">
                    <div className="max-w-lg">
                        <h1 className="mb-5 text-6xl font-bold">
                            Explore Our New Collections
                        </h1>
                        <p className="mb-5 text-xl max-w-2xl">
                            Get fashionable dresses for this season and become very gorgeous in every way. Also check
                            the amazing offer. Become our true lover and spread happiness
                        </p>
                        <Link to='/products'>
                            <button className="btn btn-outline btn-lg">Explore!</button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Hero;
