/**
 * Enhanced React Native App with Beautiful UI
 */
import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Animated,
  Image,
  Dimensions,
} from 'react-native';

const {width} = Dimensions.get('window');

type SectionProps = PropsWithChildren<{
  title: string;
  onPress?: () => void;
}>;

function Section({children, title, onPress}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const scaleValue = new Animated.Value(1);
  
  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
    if (onPress) onPress();
  };

  return (
    <Animated.View style={[
      styles.sectionContainer, 
      {
        backgroundColor: isDarkMode ? '#2A2A2A' : '#FFFFFF',
        transform: [{scale: scaleValue}],
        shadowColor: isDarkMode ? '#000' : '#888',
      }
    ]}>
      <TouchableOpacity 
        activeOpacity={0.8}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Text
          style={[
            styles.sectionTitle,
            {
              color: isDarkMode ? '#F5F5F5' : '#333333',
            },
          ]}>
          {title}
        </Text>
        <Text
          style={[
            styles.sectionDescription,
            {
              color: isDarkMode ? '#CCCCCC' : '#666666',
            },
          ]}>
          {children}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const scrollY = new Animated.Value(0);

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [200, 80],
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0.8],
    extrapolate: 'clamp',
  });

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#121212' : '#F5F5F5',
  };

  const headerBackground = isDarkMode ? '#4A00E0' : '#6C5CE7';

  const features = [
    {
      title: 'Discover Amazing Features',
      content: 'Explore our collection of premium features designed to make your life easier.',
      icon: '🌟',
    },
    {
      title: 'Personalized Experience',
      content: 'Get recommendations tailored just for you based on your preferences.',
      icon: '🎯',
    },
    {
      title: 'Seamless Integration',
      content: 'Connect with your favorite apps and services without any hassle.',
      icon: '🔗',
    },
    {
      title: '24/7 Support',
      content: 'Our team is always ready to help you with any questions or issues.',
      icon: '🛟',
    },
  ];

  const handleCardPress = (title: string) => {
    console.log(`${title} card pressed!`);
    // Add your navigation or action here
  };

  return (
    <View style={[styles.container, backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      
      <Animated.View 
        style={[
          styles.header, 
          { 
            height: headerHeight,
            opacity: headerOpacity,
            backgroundColor: headerBackground,
          }
        ]}
      >
        <View style={styles.headerContent}>
          <Text style={styles.appTitle}>Awesome App</Text>
          <Text style={styles.appSubtitle}>Built with React Native</Text>
        </View>
      </Animated.View>
      
      <ScrollView
        style={backgroundStyle}
        contentContainerStyle={styles.scrollContainer}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false}
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.content}>
          <View style={styles.userInfo}>
            <Image 
              source={{uri: 'https://randomuser.me/api/portraits/men/32.jpg'}} 
              style={styles.avatar}
            />
            <View>
              <Text style={[styles.welcomeText, {color: isDarkMode ? '#FFF' : '#333'}]}>
                Welcome back,
              </Text>
              <Text style={[styles.userName, {color: isDarkMode ? '#6C5CE7' : '#4A00E0'}]}>
                Rishav Bhardwaz
              </Text>
            </View>
          </View>
          
          <Text style={[styles.sectionHeader, {color: isDarkMode ? '#FFF' : '#333'}]}>
            Featured Today
          </Text>
          
          {features.map((feature, index) => (
            <Section 
              key={index}
              title={`${feature.icon} ${feature.title}`}
              onPress={() => handleCardPress(feature.title)}
            >
              {feature.content}
            </Section>
          ))}
          
          <View style={styles.statsContainer}>
            <View style={[styles.statCard, {backgroundColor: isDarkMode ? '#2A2A2A' : '#FFF'}]}>
              <Text style={[styles.statValue, {color: isDarkMode ? '#6C5CE7' : '#4A00E0'}]}>42</Text>
              <Text style={[styles.statLabel, {color: isDarkMode ? '#CCC' : '#666'}]}>Projects</Text>
            </View>
            <View style={[styles.statCard, {backgroundColor: isDarkMode ? '#2A2A2A' : '#FFF'}]}>
              <Text style={[styles.statValue, {color: isDarkMode ? '#6C5CE7' : '#4A00E0'}]}>98%</Text>
              <Text style={[styles.statLabel, {color: isDarkMode ? '#CCC' : '#666'}]}>Success</Text>
            </View>
            <View style={[styles.statCard, {backgroundColor: isDarkMode ? '#2A2A2A' : '#FFF'}]}>
              <Text style={[styles.statValue, {color: isDarkMode ? '#6C5CE7' : '#4A00E0'}]}>24</Text>
              <Text style={[styles.statLabel, {color: isDarkMode ? '#CCC' : '#666'}]}>Hours</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingTop: 220,
    paddingBottom: 40,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    paddingTop: 50,
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8,
  },
  appSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
  },
  content: {
    paddingHorizontal: 20,
  },
  sectionContainer: {
    marginBottom: 20,
    borderRadius: 12,
    padding: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 16,
    lineHeight: 24,
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 24,
    marginBottom: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
    borderWidth: 2,
    borderColor: '#6C5CE7',
  },
  welcomeText: {
    fontSize: 16,
    marginBottom: 4,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  statCard: {
    width: width / 3.5,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
  },
});

export default App;