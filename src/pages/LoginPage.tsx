import LoginForm from '../components/LoginForm';

export default function LoginPage({ onLogin }: { onLogin: (token: string) => void }) {
    return <LoginForm onLogin={onLogin} />;
}