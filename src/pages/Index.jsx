import { useState } from "react";
import { Container, VStack, HStack, Text, Input, Textarea, Button, IconButton, Box, Image, Select } from "@chakra-ui/react";
import { FaPlus, FaTrash, FaUserPlus } from "react-icons/fa";

const ExerciseForm = ({ onAddExercise }) => {
  const [type, setType] = useState("yoga");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [steps, setSteps] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");

  const handleAddExercise = () => {
    onAddExercise({ type, name, description, steps, sets, reps, image, video });
    setName("");
    setDescription("");
    setSteps("");
    setSets("");
    setReps("");
    setImage("");
    setVideo("");
  };

  return (
    <VStack spacing={4} width="100%">
      <Select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="yoga">Yoga</option>
        <option value="strength">Strength Training</option>
      </Select>
      <Input placeholder="Exercise Name" value={name} onChange={(e) => setName(e.target.value)} />
      <Textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <Textarea placeholder="Steps" value={steps} onChange={(e) => setSteps(e.target.value)} />
      <Input placeholder="Sets" value={sets} onChange={(e) => setSets(e.target.value)} />
      <Input placeholder="Reps" value={reps} onChange={(e) => setReps(e.target.value)} />
      <Input placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} />
      <Input placeholder="Video URL" value={video} onChange={(e) => setVideo(e.target.value)} />
      <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={handleAddExercise}>
        Add Exercise
      </Button>
    </VStack>
  );
};

const ExerciseList = ({ exercises, onDeleteExercise }) => {
  return (
    <VStack spacing={4} width="100%">
      {exercises.map((exercise, index) => (
        <Box key={index} p={4} borderWidth="1px" borderRadius="lg" width="100%">
          <HStack justifyContent="space-between">
            <Text fontSize="xl">{exercise.name}</Text>
            <IconButton aria-label="Delete" icon={<FaTrash />} colorScheme="red" onClick={() => onDeleteExercise(index)} />
          </HStack>
          <Text>{exercise.description}</Text>
          <Text>Steps: {exercise.steps}</Text>
          <Text>Sets: {exercise.sets}</Text>
          <Text>Reps: {exercise.reps}</Text>
          {exercise.image && <Image src={exercise.image} alt={exercise.name} />}
          {exercise.video && <Box as="iframe" src={exercise.video} width="100%" height="200px" />}
        </Box>
      ))}
    </VStack>
  );
};

const UserAssignment = ({ exercises, onAssignExercise }) => {
  const [selectedExercise, setSelectedExercise] = useState("");
  const [userName, setUserName] = useState("");

  const handleAssignExercise = () => {
    onAssignExercise(userName, selectedExercise);
    setUserName("");
    setSelectedExercise("");
  };

  return (
    <VStack spacing={4} width="100%">
      <Input placeholder="User Name" value={userName} onChange={(e) => setUserName(e.target.value)} />
      <Select placeholder="Select Exercise" value={selectedExercise} onChange={(e) => setSelectedExercise(e.target.value)}>
        {exercises.map((exercise, index) => (
          <option key={index} value={exercise.name}>
            {exercise.name}
          </option>
        ))}
      </Select>
      <Button leftIcon={<FaUserPlus />} colorScheme="teal" onClick={handleAssignExercise}>
        Assign Exercise
      </Button>
    </VStack>
  );
};

const Index = () => {
  const [exercises, setExercises] = useState([]);
  const [assignments, setAssignments] = useState([]);

  const handleAddExercise = (exercise) => {
    setExercises([...exercises, exercise]);
  };

  const handleDeleteExercise = (index) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const handleAssignExercise = (userName, exerciseName) => {
    setAssignments([...assignments, { userName, exerciseName }]);
  };

  return (
    <Container centerContent maxW="container.md" py={8}>
      <VStack spacing={8} width="100%">
        <Text fontSize="3xl">Fitness Website</Text>
        <ExerciseForm onAddExercise={handleAddExercise} />
        <ExerciseList exercises={exercises} onDeleteExercise={handleDeleteExercise} />
        <UserAssignment exercises={exercises} onAssignExercise={handleAssignExercise} />
        <VStack spacing={4} width="100%">
          <Text fontSize="2xl">Assigned Exercises</Text>
          {assignments.map((assignment, index) => (
            <Box key={index} p={4} borderWidth="1px" borderRadius="lg" width="100%">
              <Text>
                {assignment.userName} - {assignment.exerciseName}
              </Text>
            </Box>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;
