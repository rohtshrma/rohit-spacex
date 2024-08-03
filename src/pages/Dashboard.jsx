// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [launches, setLaunches] = useState([]);
  const [secondLaunch, setSecondLaunch] = useState(null); // State for second card
  const [rocketsMap, setRocketsMap] = useState({});
  const [launchpadsMap, setLaunchpadsMap] = useState({});
  const [crewAvatars, setCrewAvatars] = useState([]); // State for crew avatars

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the latest launch data
        const response = await axios.post('https://api.spacexdata.com/v5/launches/query', {
          query: {
            upcoming: false
          },
          options: {
            limit: 1,
            sort: {
              flight_number: 'desc'
            },
            populate: [
              {
                path: 'cores'
              },
              {
                path: 'launchpad'
              },
              {
                path: 'rocket',
                select: {
                  name: 1
                }
              },
              {
                path: 'fairings'
              },
              {
                path: 'capsules'
              },
              {
                path: 'payloads'
              },
              {
                path: 'crew',
                populate: [
                  {
                    path: 'crew'
                  }
                ]
              },
              {
                path: 'cores',
                populate: [
                  {
                    path: 'core'
                  },
                  {
                    path: 'landpad'
                  }
                ]
              }
            ]
          }
        });

        const launchesData = response.data.docs;

        // Extract rocket and launchpad IDs from launches data
        const rocketIds = [...new Set(launchesData.map(launch => launch.rocket._id))];
        const launchpadIds = [...new Set(launchesData.map(launch => launch.launchpad._id))];

        // Create maps for rocket and launchpad names
        const rocketsMap = {};
        const launchpadsMap = {};

        launchesData.forEach(launch => {
          rocketsMap[launch.rocket._id] = launch.rocket.name;
          launchpadsMap[launch.launchpad._id] = launch.launchpad.name;
        });

        setRocketsMap(rocketsMap);
        setLaunchpadsMap(launchpadsMap);

        // Append rocket names and launch pad names to launch data
        const launchesWithDetails = launchesData.map(launch => ({
          ...launch,
          rocketName: rocketsMap[launch.rocket._id] || 'Unknown Rocket',
          launchpadName: launchpadsMap[launch.launchpad._id] || 'Unknown LaunchPad'
        }));

        setLaunches(launchesWithDetails);

        // Fetch second launch data
        const responseSecond = await axios.post('https://api.spacexdata.com/v5/launches/query', {
          query: {
            upcoming: false
          },
          options: {
            limit: 1,
            sort: {
              flight_number: 'desc'
            },
            skip: 1, // Skip the first launch to get the second one
            populate: [
              {
                path: 'cores'
              },
              {
                path: 'launchpad'
              },
              {
                path: 'rocket',
                select: {
                  name: 1
                }
              },
              {
                path: 'fairings'
              },
              {
                path: 'capsules'
              },
              {
                path: 'payloads'
              },
              {
                path: 'crew',
                populate: [
                  {
                    path: 'crew'
                  }
                ]
              },
              {
                path: 'cores',
                populate: [
                  {
                    path: 'core'
                  },
                  {
                    path: 'landpad'
                  }
                ]
              }
            ]
          }
        });

        const secondLaunchData = responseSecond.data.docs[0];
        
        // Extract crew member information
        const crewMembers = secondLaunchData.crew || [];
        setCrewAvatars(crewMembers);

        // Append rocket names and launch pad names to second launch data
        const secondLaunchWithDetails = {
          ...secondLaunchData,
          rocketName: rocketsMap[secondLaunchData.rocket._id] || 'Unknown Rocket',
          launchpadName: launchpadsMap[secondLaunchData.launchpad._id] || 'Unknown LaunchPad'
        };

        setSecondLaunch(secondLaunchWithDetails);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const gridContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)', // Two cards per row
    gap: '60px',
    padding: '20px',
  };

  const cardStyle = {
    display: 'flex',
    backgroundColor: '#000',  // Black background
    color: '#fff',            // White text color
    padding: '20px',
    borderRadius: '8px',
    alignItems: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    gap: '20px',
    width: '100%', // Ensure card takes full width of the grid cell
  };

  const contentStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  };

  const imageStyle = {
    flex: '0 0 150px',
    borderRadius: '8px',
  };

  const avatarContainerStyle = {
    display: 'flex',
    gap: '10px',
    marginTop: '1rem',
  };

  const avatarStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000',
    fontSize: '16px',
    overflow: 'hidden',
  };

  return (
    <div style={gridContainerStyle}>
      {launches[0] && (
        <div style={cardStyle}>
          <div style={contentStyle}>
            <h3>Upcoming Launch</h3>
            <h4 style={{ margin: 0 }}>Mission Name</h4>
            <p style={{ margin: 0 }}>{launches[0].name}</p>
            <h4 style={{ margin: 0, marginTop: '1rem' }}>Rocket</h4>
            <p style={{ margin: 0 }}>{launches[0].rocketName}</p>
            <h4 style={{ margin: 0, marginTop: '1rem' }}>Flight Number</h4>
            <p style={{ margin: 0 }}>{launches[0].flight_number}</p>
            <h4 style={{ margin: 0, marginTop: '1rem' }}>Time (UTC)</h4>
            <p style={{ margin: 0 }}>{new Date(launches[0].date_utc).toLocaleString()}</p>
          </div>
          <div>
            <h2>Rocket Logo</h2>
            <img
              style={imageStyle}
              src={`https://api.spacexdata.com/v4/rockets/${launches[0].rocket._id}`} // Use appropriate image URL if available
              alt="Rocket"
            />
            <h4 style={{ margin: 0, marginTop: '1rem' }}>LaunchPad</h4>
            <p style={{ margin: 0 }}>{launches[0].launchpadName}</p>
          </div>
        </div>
      )}
      {secondLaunch && (
        <div style={cardStyle}>
          <div style={contentStyle}>
            <h3>Previous Launch</h3>
            <h4 style={{ margin: 0 }}>Mission Name</h4>
            <p style={{ margin: 0 }}>{secondLaunch.name}</p>
            <h4 style={{ margin: 0, marginTop: '1rem' }}>Rocket</h4>
            <p style={{ margin: 0 }}>{secondLaunch.rocketName}</p>
            <h4 style={{ margin: 0, marginTop: '1rem' }}>Flight Number</h4>
            <p style={{ margin: 0 }}>{secondLaunch.flight_number}</p>
            <h4 style={{ margin: 0, marginTop: '1rem' }}>Time (UTC)</h4>
            <p style={{ margin: 0 }}>{new Date(secondLaunch.date_utc).toLocaleString()}</p>
          </div>
          <div>
            <h2>Crew</h2>
            <div style={avatarContainerStyle}>
              {crewAvatars.map((crew, index) => (
                <div
                  key={index}
                  style={avatarStyle}
                >
                  {crew.name ? crew.name[0].toUpperCase() : '?'}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
