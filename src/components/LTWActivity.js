import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from 'antd';
import { useLocation } from 'react-router-dom';

import { LoginPage } from '../pages';
import ApiService from '../services/ApiService';
import { deviceType, responsive } from '../utils/helpers';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const { Meta } = Card;

export const LTWActivity = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMounted = useRef();

  const [loggedInUser, setLoggedInUser] = useState(false);
  const [currentActivity, setCurrentActivity] = useState({});
  const [thumbnails, setThumbNails] = useState([]);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt') ? true : false;
    setLoggedInUser(jwt);
  }, [location]);

  useEffect(() => {
    if (isMounted.current) return;

    // GET ACTIVITIES
    (async () => {
      let getActivitiesResponse = await ApiService.getActivities();
      console.log('activities:', getActivitiesResponse);
      if (
        getActivitiesResponse.status === 200 ||
        getActivitiesResponse.status === 201
      ) {
        setCurrentActivity(getActivitiesResponse.data);
        setThumbNails(getActivitiesResponse.data.images);

        // GET NEARBY ACTIVITY
        let nearbyActivityResponse = await ApiService.getNearbyActivity(
          getActivitiesResponse.data.id
        );
        console.log('trips:', nearbyActivityResponse);
        if (
          nearbyActivityResponse.status === 200 ||
          nearbyActivityResponse.status === 201
        ) {
          setTrips(nearbyActivityResponse.data);
        }
      }
    })();

    // GET TRIPS
    (async () => {
      let getTripsResponse = await ApiService.getTrips();
      console.log('trips:', getTripsResponse.data[0].activities);
      if (getTripsResponse.status === 200 || getTripsResponse.status === 201) {
        setTrips(getTripsResponse.data[0].activities);
      }
    })();

    isMounted.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = () => {
    navigate('/login', { replace: true });
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    setLoggedInUser(false);
  };

  console.log('thumbnails:', thumbnails);
  console.log('currentActivity:', currentActivity);
  console.log('trips:', trips);

  return (
    <div>
      {!loggedInUser && <LoginPage loggedInUser={loggedInUser} />}
      <h1>Live The World</h1>
      <Button onClick={logout}>Logout</Button>
      <Button style={{ float: 'right', marginRight: 12 }} onClick={logout}>
        Save
      </Button>

      {/* ACTIVITIES */}
      <div>
        <Carousel
          swipeable={true}
          draggable={false}
          showDots={false}
          responsive={responsive}
          ssr={true}
          infinite={true}
          autoPlay={false}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          customTransition='all .5'
          transitionDuration={500}
          containerClass='carousel-container'
          removeArrowOnDeviceType={['tablet', 'mobile']}
          deviceType={deviceType()}
          dotListClass='custom-dot-list-style'
          itemClass='carousel-item-padding-40-px'
        >
          {thumbnails.map((item) => {
            return (
              <div key={item.id}>
                <img
                  src={item.url}
                  alt=''
                  loading='lazy'
                  style={{
                    width: 600,
                    height: 500,
                  }}
                />
              </div>
            );
          })}
        </Carousel>
      </div>

      {/* NEARBY ACTIVITY */}
      <div className='container'>
        <div className='row'>
          {trips.map((item) => {
            return (
              <div className='card' key={item.id}>
                <Button>Save</Button>
                <Card
                  hoverable
                  style={{
                    width: 240,
                  }}
                  cover={
                    <img
                      alt='example'
                      src={item.images[0].small}
                      style={{
                        width: 240,
                        height: 240,
                      }}
                    />
                  }
                >
                  <Meta
                    title={item.name}
                    description={item.description_short}
                    style={{
                      height: 120,
                    }}
                  />
                  <Button
                    type='link'
                    // onClick={readMoreNearByActivity(item.slug)}
                  >
                    Read More
                  </Button>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
