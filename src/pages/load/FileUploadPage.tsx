import React, { useRef, useState } from 'react';
import { translationService } from '../../modules/langs/translation-service';

import '../../styles/FileUploadPage.css';

interface Props {
    onFileLoad: (data: unknown) => void;
}

export default function FileUploadPage({ onFileLoad }: Props) {
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
                console.error(translationService.getUIText('fileReadError'), error);
                alert(translationService.getUIText('invalidFileFormat'));
            } finally {
                setIsLoading(false);
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            }
        };

        reader.onerror = () => {
            setIsLoading(false);
            alert(translationService.getUIText('fileReadError'));
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
                {isLoading ? translationService.getUIText('loading') : translationService.getUIText('loadCharacterJson')}
            </button>
            <p className="upload-hint">
                {translationService.getUIText('uploadCharacterJson')}
            </p>
        </div>
    );
}