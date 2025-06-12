import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  useToast,
  Container,
  Flex,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  IconButton,
  Link,
} from '@chakra-ui/react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { AnimatedBackground } from '../components/AnimatedBackground';

const MotionBox = motion(Box);

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(username, password);
      navigate('/tasks');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Invalid credentials',
        status: 'error',
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
        <Container maxW="container.sm" py={10}>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box
              p={8}
              bg={cardBg}
              borderRadius="xl"
              boxShadow="2xl"
              borderWidth={1}
              borderColor={borderColor}
              backdropFilter="blur(10px)"
              bgGradient="linear(to-br, white, gray.50)"
            >
              <VStack spacing={6} align="stretch">
                <Heading
                  textAlign="center"
                  fontSize="3xl"
                  fontWeight="bold"
                  color="blue.600"
                  mb={4}
                >
                  Welcome Back
                </Heading>
                <Text textAlign="center" color="gray.600">
                  Sign in to manage your tasks
                </Text>
                <form onSubmit={handleSubmit}>
                  <VStack spacing={5}>
                    <FormControl isRequired>
                      <FormLabel fontWeight="medium">Username</FormLabel>
                      <Input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        size="lg"
                        borderRadius="md"
                        _hover={{ borderColor: 'blue.400' }}
                        _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px blue.500' }}
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel fontWeight="medium">Password</FormLabel>
                      <InputGroup size="lg">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          borderRadius="md"
                          _hover={{ borderColor: 'blue.400' }}
                          _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px blue.500' }}
                        />
                        <InputRightElement>
                          <IconButton
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                            icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                            variant="ghost"
                            onClick={() => setShowPassword(!showPassword)}
                          />
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                    <Button
                      type="submit"
                      colorScheme="blue"
                      size="lg"
                      width="full"
                      mt={4}
                      _hover={{
                        transform: 'translateY(-2px)',
                        boxShadow: 'lg',
                      }}
                      transition="all 0.2s"
                      isLoading={isLoading}
                    >
                      Sign In
                    </Button>
                  </VStack>
                </form>
                <Text textAlign="center" mt={4}>
                  Don't have an account?{' '}
                  <Link
                    as="a"
                    href="/register"
                    color="blue.500"
                    fontWeight="medium"
                  >
                    Create Account
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