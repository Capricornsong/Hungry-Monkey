
import React from 'react'
import Navbar from '../components/Navbar'
import PostcodeSearch from '../components/PostcodeSearch'
import RestaurantRow from '../components/RestaurantRow'
import '../css/Home.css'

function Home() {
  return (
    <div id="home-div">
      <Navbar />
      <PostcodeSearch />
      <RestaurantRow />
    </div>
  )
}

export default Home