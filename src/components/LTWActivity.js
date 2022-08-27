import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { useLocation } from 'react-router-dom';

import { LoginPage } from '../pages';
import ApiService from '../services/ApiService';
import { deviceType } from '../utils/helpers';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export const LTWActivity = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMounted = useRef();

  const [loggedInUser, setLoggedInUser] = useState(false);
  const [thumbnails, setThumbNails] = useState([]);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt') ? true : false;
    setLoggedInUser(jwt);
  }, [location]);

  useEffect(() => {
    if (isMounted.current) return;

    (async () => {
      let response = await ApiService.getActivities();
      console.log('response:', response);
      if (response.status === 200 || response.status === 201) {
        setThumbNails(response.data.images);
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

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 2, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  console.log('thumbnails:', thumbnails);

  return (
    <div>
      {!loggedInUser && <LoginPage loggedInUser={loggedInUser} />}
      <h1 className='mt-2 mx-2'>LTW Activity</h1>
      <Button onClick={logout}>Logout</Button>
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
                width={500}
                height={500}
                alt=''
                loading='lazy'
              />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};
