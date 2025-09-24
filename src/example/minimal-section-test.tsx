import React, { useRef, useState } from "react";
import { SectionList, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Animated, { useAnimatedRef } from "react-native-reanimated";

// Minimal test data
const testData = [
  {
    title: "Test Section",
    data: [
      { id: "1", title: "Test Item 1" },
      { id: "2", title: "Test Item 2" },
    ],
  },
];

export const MinimalSectionTest = () => {
  const [currentTest, setCurrentTest] = useState(0);

  // Create all required refs and AnimatedComponents at the top level of the component
  const normalRef = useRef<any>(null);
  const animatedRef = useAnimatedRef<any>();
  const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);

  const renderItem = ({ item }: any) => (
    <View style={styles.item}>
      <Text>{item.title}</Text>
    </View>
  );

  const renderSectionHeader = ({ section }: any) => (
    <View style={styles.header}>
      <Text style={styles.headerText}>{section.title}</Text>
    </View>
  );

  const renderTest = () => {
    console.log(`=== Rendering Test ${currentTest + 1} ===`);

    switch (currentTest) {
      case 0:
        // Test 1: SectionList
        console.log("Test 1: Native SectionList");
        return (
          <SectionList
            sections={testData}
            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
            keyExtractor={(item) => item.id}
            style={styles.list}
          />
        );

      case 1:
        // Test 2: Native SectionList with normal ref
        console.log("Test 2: Native SectionList with normal ref");
        return (
          <SectionList
            sections={testData}
            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
            keyExtractor={(item) => item.id}
            ref={normalRef}
            style={styles.list}
          />
        );

      case 2:
        // Test 3: AnimatedSectionList
        console.log("Test 3: AnimatedSectionList");
        return (
          <AnimatedSectionList
            sections={testData}
            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
            keyExtractor={(item) => item.id}
            style={styles.list}
          />
        );

      case 3:
        // Test 4: AnimatedSectionList with animated ref
        console.log("Test 4: AnimatedSectionList with animated ref");
        return (
          <AnimatedSectionList
            sections={testData}
            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
            keyExtractor={(item) => item.id}
            ref={animatedRef}
            style={styles.list}
          />
        );

      default:
        return <Text>No test selected</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minimal Section Test</Text>

      <View style={styles.buttonContainer}>
        {[0, 1, 2, 3].map((testIndex) => (
          <TouchableOpacity
            key={testIndex}
            style={[
              styles.button,
              currentTest === testIndex && styles.activeButton
            ]}
            onPress={() => {
              console.log(`Switching to test ${testIndex + 1}`);
              setCurrentTest(testIndex);
            }}
          >
            <Text style={styles.buttonText}>Test {testIndex + 1}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.testContainer}>
        <Text style={styles.testLabel}>
          Current Test: {currentTest + 1} - {
            ['Native SectionList',
             'Native SectionList + Normal Ref',
             'AnimatedSectionList',
             'Animated + Ref'][currentTest]
          }
        </Text>

        <View style={styles.testArea}>
          {renderTest()}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  activeButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  testContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  testLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  testArea: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  item: {
    padding: 10,
    backgroundColor: "#f9f9f9",
    marginBottom: 5,
    borderRadius: 3,
  },
  header: {
    padding: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 3,
    marginBottom: 5,
  },
  headerText: {
    fontWeight: "bold",
  },
});