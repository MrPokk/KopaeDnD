import React, { useRef, useState } from 'react';
import '../styles/FileUpload.css';

interface Props {
    onFileLoad: (data: unknown) => void;
}

export default function FileUpload({ onFileLoad }: Props) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setIsLoading(true);
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const content = e.target?.result as string;
                const jsonData = JSON.parse(content);
                onFileLoad(jsonData);
            } catch (error) {
                console.error('Ошибка при чтении файла:', error);
                alert('Неверный формат файла. Убедитесь, что это корректный JSON файл персонажа D&D.');
            } finally {
                setIsLoading(false);
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            }
        };

        reader.onerror = () => {
            setIsLoading(false);
            alert('Ошибка при чтении файла');
        };

        reader.readAsText(file);
    };

    return (
        <div className="file-upload">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".json"
                style={{ display: 'none' }}
            />
            <button
                onClick={() => fileInputRef.current?.click()}
                className="upload-button"
                disabled={isLoading}
            >
                {isLoading ? 'Загрузка...' : 'Загрузить JSON персонажа'}
            </button>
            <p className="upload-hint">
                Загрузите JSON файл персонажа D&D для отображения характеристик
            </p>
        </div>
    );
}