import styled from "styled-components";
import Container, { Length } from "../../ui/Container";
import Flex, { FlexDirection, FlexJustify } from "../../ui/Flex";
import { Color, Font, Spacing } from "../../ui/cssConstants";
import Heading from "../../ui/Heading";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Text, { TextAlign } from "../../ui/Text";
import { MdAlternateEmail, MdOutlineLock } from "react-icons/md";
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { useAuth } from "./AuthProvider";

const StyledLoginForm = styled.div`
  display: grid;
  height: 100vh;
  place-items: center;
`;

const Brand = styled(Flex)`
  font-size: 3.6rem;
  font-weight: 600;
  align-items: center;
  color: var(--color-brand-700);
  font-family: "Quicksand", sans-serif;
  margin-bottom: 1.4rem;
  justify-content: center;
  &:hover + div {
    visibility: visible;
  }
`;

const InputBox = styled(Flex)`
  position: relative;
  label {
    font-size: 1.4rem;
    color: ${Color.grey400};
    position: absolute;
    top: 50%;
    left: 2rem;
    transform: translateY(-50%);
    transition: all 0.3s;
    padding: 0 3px;
    pointer-events: none;
    background-color: ${Color.grey0};
  }
  svg {
    position: absolute;
    top: 50%;
    right: 2rem;
    transform: translateY(-50%);
    color: ${Color.grey400};
  }

  input {
    font-size: 1.6rem;
    padding: 1rem 2rem;
    border: 1.5px solid ${Color.grey100};
    border-radius: 6px;
    width: 100%;
    color: ${Color.grey700};
    /* background-color: ${Color.grey50}; */
    &:focus {
      background-color: ${Color.grey0};
      border: 1.5px solid ${Color.brand500};
    }
    &:focus + label {
      top: 8.9px;
      left: 2rem;
      color: ${Color.brand500};
      transform: translateY(-100%);
      font-size: 1.2rem;
    }

    &:focus ~ svg {
      color: ${Color.brand500};
    }

    &::placeholder {
      visibility: hidden;
    }

    :not(&:placeholder-shown) + label {
      top: 8.9px;
      left: 2rem;
      color: ${Color.grey400};
      transform: translateY(-100%);
      font-size: 1.2rem;
    }
  }
`;

function LoginForm() {
  const { register, handleSubmit } = useForm<{
    email: string;
    password: string;
  }>();
  const { login, isLoginLoading } = useAuth();

  function onSubmit(data: { email: string; password: string }) {
    login(data);
  }

  return (
    <StyledLoginForm>
      <Container>
        <Container
          borderRadius={Spacing.s8}
          padding={[Spacing.s32, Spacing.s24, Spacing.s48, Spacing.s24]}
          border={Spacing.s1}
          borderColor={Color.brand300}
          width={Length.L40}
        >
          <Brand>
            <span>Roomy</span>
          </Brand>
          <Flex mb={Spacing.s8} justify={FlexJustify.Center}>
            <Heading mb={Spacing.zero} fs={Font.fs20}>
              Hello again!
            </Heading>
          </Flex>
          <Flex mb={Spacing.s32} justify={FlexJustify.Center}>
            <Text color={Color.grey500} fontSize={Font.fs16}>
              Log in to your Account
            </Text>
          </Flex>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputBox
              gap={Spacing.s4}
              direction={FlexDirection.Column}
              mb={Spacing.s12}
            >
              <Input
                padding={[Spacing.s8, Spacing.s16]}
                border={Spacing.s1}
                borderRadius={Spacing.s2}
                type="email"
                width={Length.Full}
                placeholder="Email"
                {...register("email", { required: true })}
              />
              <label>Email</label>
              <MdAlternateEmail />
            </InputBox>

            <InputBox
              gap={Spacing.s4}
              direction={FlexDirection.Column}
              mb={Spacing.s32}
            >
              <Input
                padding={[Spacing.s8, Spacing.s16]}
                border={Spacing.s1}
                borderRadius={Spacing.s2}
                width={Length.Full}
                type="password"
                placeholder="Password"
                {...register("password", { required: true })}
              />
              <label>Password</label>
              <MdOutlineLock />
            </InputBox>

            <Button
              padding={[Spacing.s12]}
              color={Color.grey0}
              width={Length.Full}
              type="submit"
              disabled={isLoginLoading}
            >
              <div>
                {isLoginLoading ? (
                  <ClipLoader color={Color.blue100} size={24} />
                ) : (
                  <Text
                    color={Color.brand100}
                    fontSize={Font.fs18}
                    textAlign={TextAlign.Center}
                  >
                    Login
                  </Text>
                )}
              </div>
            </Button>
          </form>
        </Container>
      </Container>
    </StyledLoginForm>
  );
}

export default LoginForm;
