import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { AnimatedBackground } from "../components/AnimatedBackground";

const MotionBox = motion(Box);

export const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    try {
      await axios.post("http://localhost:3001/api/auth/register", {
        username,
        password,
      });
      toast({
        title: "Success",
        description: "Registration successful! Please login.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/login");
    } catch (error) {
      toast({
        title: "Error",
        description: "Registration failed. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatedBackground />
      <Flex minH="100vh" align="center" justify="center" bg="transparent">
        <Container maxW="lg" py={{ base: "12", md: "24" }} px={{ base: "0", sm: "8" }}>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box
              py={{ base: "0", sm: "8" }}
              px={{ base: "4", sm: "10" }}
              bg="rgba(255, 255, 255, 0.8)"
              boxShadow={{ base: "none", sm: "xl" }}
              borderRadius={{ base: "none", sm: "xl" }}
              backdropFilter="blur(10px)"
            >
              <VStack spacing="6">
                <VStack spacing="3" textAlign="center">
                  <Heading size="lg" color="blue.600">Create Your Account</Heading>
                  <Text color="gray.600">Start managing your tasks efficiently</Text>
                </VStack>

                <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                  <VStack spacing="5">
                    <FormControl isRequired>
                      <FormLabel htmlFor="username" color="gray.700">Username</FormLabel>
                      <Input
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        size="lg"
                        bg="white"
                        _hover={{ borderColor: "blue.400" }}
                        _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px blue.500" }}
                      />
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel htmlFor="password" color="gray.700">Password</FormLabel>
                      <InputGroup size="lg">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          bg="white"
                          _hover={{ borderColor: "blue.400" }}
                          _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px blue.500" }}
                        />
                        <InputRightElement width="4.5rem">
                          <Button
                            h="1.75rem"
                            size="sm"
                            onClick={() => setShowPassword(!showPassword)}
                            variant="ghost"
                            _hover={{ bg: "transparent" }}
                          >
                            {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel htmlFor="confirmPassword" color="gray.700">Confirm Password</FormLabel>
                      <InputGroup size="lg">
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          bg="white"
                          _hover={{ borderColor: "blue.400" }}
                          _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px blue.500" }}
                        />
                        <InputRightElement width="4.5rem">
                          <Button
                            h="1.75rem"
                            size="sm"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            variant="ghost"
                            _hover={{ bg: "transparent" }}
                          >
                            {showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>

                    <Button
                      type="submit"
                      colorScheme="blue"
                      size="lg"
                      fontSize="md"
                      width="100%"
                      isLoading={isLoading}
                      _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
                      transition="all 0.2s"
                    >
                      Create Account
                    </Button>
                  </VStack>
                </form>

                <Text color="gray.600" textAlign="center">
                  Already have an account?{" "}
                  <Link as={RouterLink} to="/login" color="blue.500" fontWeight="medium">
                    Sign in
                  </Link>
                </Text>
              </VStack>
            </Box>
          </MotionBox>
        </Container>
      </Flex>
    </>
  );
}; 