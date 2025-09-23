import '../styles/App.css';
import '../styles/extra/variables.css';
import '../styles/extra/reset.css';

export default function PopoverContent({ children }: { children: React.ReactNode }) {
    return <div className="popover-content-wrapper">{children}</div>;
}