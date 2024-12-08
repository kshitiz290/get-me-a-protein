import React from 'react'
import Link from 'next/link'

const About = () => {
  return (
    <>
         <div className="bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)]  py-16">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header Section */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-semibold text-white">About Get Me A Protein</h1>
          <p className="mt-4 text-lg text-white">
            We are a community-driven crowdfunding platform empowering creators, entrepreneurs, and innovators. <br />
            This project focus more on getting funds for a <b>Protein</b> as the name resembles.
          </p>
        </header>

        {/* Mission Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold text-white mb-4">Our Mission</h2>
            <p className="text-lg text-white">
              Our mission is simple: to help turn ideas into reality. Whether you’re a creator looking to fund your next project or a backer eager to support meaningful ideas, we are here to make it happen.
            </p>
          </div>
          <div className="flex justify-center">
            {/* <img src="/images/mission-image.jpg" alt="Our Mission" className="w-full h-auto rounded-lg shadow-lg" /> */}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] py-12">
          <h2 className="text-3xl font-semibold text-center text-white mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="p-6 bg-blue-100 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-blue-600">Create a Campaign</h3>
                <p className="text-gray-600 mt-4">
                  Share your idea with the world by creating a campaign. Tell your story, set a goal, and start funding!
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="p-6 bg-green-100 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-green-600">Support a Cause</h3>
                <p className="text-gray-600 mt-4">
                  Explore campaigns that inspire you. Make a contribution and help bring innovative projects to life.
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="p-6 bg-yellow-100 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-yellow-600">Achieve Your Goal</h3>
                <p className="text-gray-600 mt-4">
                  With the help of backers, you can meet your funding goal and bring your vision to fruition.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="text-center py-12  text-white">
          <h2 className="text-3xl font-semibold mb-4">Join Us Today!</h2>
          <p className="text-lg mb-6">
            Ready to bring your idea to life? Start a campaign or support a project today!
          </p>
          <Link href="/login" className="px-6 py-3  text-white rounded-full text-lg bg-blue-900 hover:bg-blue-700 transition">
             Start Your Campaign
          </Link>
        </section>
        </div>
        </div>
    </>
  )
}

export default About
export const metadata = {
    title: 'About - Get Me A Protein',
  }
