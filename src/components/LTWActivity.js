import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Row, Col, Tag, Spin, Modal } from 'antd';
import { useLocation } from 'react-router-dom';

import { LoginPage } from '../pages';
import ApiService from '../services/ApiService';
import { deviceType, responsive } from '../utils/helpers';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { Marker, NavigationControl, GeolocateControl } from 'react-map-gl';

const { Meta } = Card;

export const LTWActivity = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMounted = useRef();
  let currentActivityLocation = location.pathname.split('/')[2];

  const [loggedInUser, setLoggedInUser] = useState(false);
  const [currentActivity, setCurrentActivity] = useState({});
  const [thumbnails, setThumbNails] = useState([]);
  const [trips, setTrips] = useState([]);
  const [lng, setLng] = useState(null);
  const [lat, setLat] = useState(null);
  const [showModalForCorrectUrl, setShowModalForCorrectUrl] = useState(false);
  const [existingFavTrips, setExistingFavTrips] = useState([]);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt') ? true : false;
    setLoggedInUser(jwt);
  }, [location]);

  useEffect(() => {
    if (isMounted.current) return;

    // GET ACTIVITIES
    (async () => {
      let getActivitiesResponse;
      currentActivityLocation
        ? (getActivitiesResponse = await ApiService.getActivities(
            currentActivityLocation
          ))
        : (getActivitiesResponse = await ApiService.getActivities(
            'castle-of-gerald-the-devil'
          ));

      if ([200, 201].includes(getActivitiesResponse.status)) {
        setCurrentActivity(getActivitiesResponse.data);
        setThumbNails(getActivitiesResponse.data.images);
        setLat(getActivitiesResponse.data.latitude);
        setLng(getActivitiesResponse.data.longitude);

        // GET NEARBY ACTIVITY
        let nearbyActivityResponse = await ApiService.getNearbyActivity(
          getActivitiesResponse.data.id
        );
        if ([200, 201].includes(nearbyActivityResponse.status)) {
          setTrips(nearbyActivityResponse.data);
        }
      } else {
        setShowModalForCorrectUrl(true);
      }
    })();

    // GET TRIPS
    (async () => {
      let getExistingFavTripsResponse = await ApiService.getTrips();
      if ([200, 201].includes(getExistingFavTripsResponse.status))
        setExistingFavTrips(getExistingFavTripsResponse.data[0].activities);
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

  // console.log('thumbnails:', thumbnails);
  // console.log('currentActivity:', currentActivity);
  // console.log('trips:', trips);
  // console.log('getExistingFavTripsResponse:', existingFavTrips);

  const updateFavExistingTrips = async (event, buttonText) => {
    // UPDATE ACTIVITY FAV
    const payloadData = {
      activityId: currentActivity.id,
      tripId: currentActivity.id,
      tripType: 'favorite',
    };
    let updateExistingFavTripsResponse;
    if (buttonText === 'Saved')
      updateExistingFavTripsResponse =
        await ApiService.removeActivityToExistingFavTrips(payloadData);
    else
      updateExistingFavTripsResponse =
        await ApiService.addActivityToExistingFavTrips(payloadData);

    // FETCH LATEST ACTIVITIES TO UPDATE SAVE BUTTON
    if ([200, 201].includes(updateExistingFavTripsResponse.status)) {
      let getExistingFavTripsResponse = await ApiService.getTrips();
      if ([200, 201].includes(getExistingFavTripsResponse.status)) {
        setExistingFavTrips(getExistingFavTripsResponse.data[0].activities);
      }
    }
  };

  return (
    <div>
      {!loggedInUser ? (
        <LoginPage loggedInUser={!loggedInUser} />
      ) : (
        <>
          {showModalForCorrectUrl ? (
            <Modal
              title='Error Occured'
              visible={showModalForCorrectUrl}
              footer={null}
              closable={false}
            >
              <p>Please enter the correct URL</p>
              <Button
                id='app-content-nf-button'
                type='primary'
                href='/activities/castle-of-gerald-the-devil'
              >
                Back Home
              </Button>
            </Modal>
          ) : (
            <>
              {Object.keys(currentActivity).length > 0 ? (
                <>
                  <h1>Live The World</h1>
                  <Button onClick={logout}>Logout</Button>
                  <Button
                    style={{ float: 'right', marginRight: 12 }}
                    onClick={(event) =>
                      updateFavExistingTrips(
                        event,
                        existingFavTrips.filter(
                          (item) => item.id === currentActivity.id
                        ).length > 0
                          ? 'Saved'
                          : 'Save'
                      )
                    }
                  >
                    {existingFavTrips.filter(
                      (item) => item.id === currentActivity.id
                    ).length > 0
                      ? 'Saved'
                      : 'Save'}
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

                  {/* ACTIVITY TITLE */}
                  <Row>
                    <Col span={12}>
                      <h1>{currentActivity.name}</h1>
                      <div>
                        {currentActivity.labels.map((label) => {
                          return (
                            <Tag color='default' key={label.id}>
                              {label.name}
                            </Tag>
                          );
                        })}
                      </div>
                    </Col>
                  </Row>

                  {/* ACTIVITY DESCRIPTION SHORT */}
                  <div style={{ fontWeight: 'bold' }}>
                    {currentActivity.description_short}
                  </div>

                  {/* ACTIVITY DESCRIPTION LONG */}
                  <div style={{ whiteSpace: 'pre-wrap', paddingTop: 8 }}>
                    {currentActivity.description_long}
                  </div>

                  {/* MAPBOX */}
                  <div style={{ paddingTop: 8 }}>
                    <Map
                      mapboxAccessToken={
                        process.env.REACT_APP_MAPBOX_ACESS_TOKEN
                      }
                      style={{
                        width: '100%',
                        height: '400px',
                      }}
                      initialViewState={{
                        longitude: lng,
                        latitude: lat,
                        zoom: 14,
                      }}
                      mapStyle='mapbox://styles/mapbox/streets-v9'
                    >
                      <Marker longitude={lng} latitude={lat} />
                      <NavigationControl />
                      <GeolocateControl />
                    </Map>
                  </div>

                  {/* NEARBY ACTIVITY */}
                  <h1>Nearby Activities</h1>
                  <div className='container'>
                    <div className='row'>
                      {trips.map((item) => {
                        return (
                          <div className='card' key={item.id}>
                            <Card
                              // extra={<a href='#'>Save</a>}
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
                </>
              ) : (
                <div className='spin-container'>
                  <Spin className='spinner' />
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};
