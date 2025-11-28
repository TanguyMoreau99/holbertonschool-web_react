import { Fragment, useReducer, useCallback, useEffect } from 'react';
import axios from 'axios';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import WithLogging from '../HOC/WithLogging';
import { appReducer, initialState, APP_ACTIONS } from './appReducer';

const LoginWithLogging = WithLogging(Login);
const CourseListWithLogging = WithLogging(CourseList);

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Fetch notifications on component mount
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('/notifications.json');
        dispatch({
          type: APP_ACTIONS.SET_NOTIFICATIONS,
          payload: { notifications: response.data },
        });
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  // Fetch courses when user state changes
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/courses.json');
        dispatch({
          type: APP_ACTIONS.SET_COURSES,
          payload: { courses: response.data },
        });
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, [state.user]);

  const handleDisplayDrawer = useCallback(() => {
    dispatch({ type: APP_ACTIONS.TOGGLE_DRAWER });
  }, []);

  const handleHideDrawer = useCallback(() => {
    dispatch({ type: APP_ACTIONS.TOGGLE_DRAWER });
  }, []);

  const logIn = useCallback((email, password) => {
    dispatch({
      type: APP_ACTIONS.LOGIN,
      payload: { email, password },
    });
  }, []);

  const logOut = useCallback(() => {
    dispatch({ type: APP_ACTIONS.LOGOUT });
  }, []);

  const markNotificationAsRead = useCallback((id) => {
    console.log(`Notification ${id} has been marked as read`);
    dispatch({
      type: APP_ACTIONS.MARK_NOTIFICATION_READ,
      payload: { id },
    });
  }, []);

  return (
    <Fragment>
      <Notifications 
        displayDrawer={state.displayDrawer} 
        notifications={state.notifications}
        handleDisplayDrawer={handleDisplayDrawer}
        handleHideDrawer={handleHideDrawer}
        markNotificationAsRead={markNotificationAsRead}
      />
      <div className="App relative min-h-screen pb-16">
        <Header user={state.user} logOut={logOut} />
        <main className="px-4 sm:px-6 md:px-8">
          {state.user.isLoggedIn ? (
            <BodySectionWithMarginBottom title="Course list">
              <CourseListWithLogging courses={state.courses} />
            </BodySectionWithMarginBottom>
          ) : (
            <BodySectionWithMarginBottom title="Log in to continue">
              <LoginWithLogging logIn={logIn} />
            </BodySectionWithMarginBottom>
          )}
          <BodySection title="News from the School">
            <p>ipsum Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique, asperiores architecto blanditiis fuga doloribus sit illum aliquid ea distinctio minus accusantium, impedit quo voluptatibus ut magni dicta. Recusandae, quia dicta?</p>
          </BodySection>
        </main>
        <Footer user={state.user} />
      </div>
    </Fragment>
  );
}

export default App;
