import React, { useState, useEffect, useCallback } from 'react';
import { Input, Button, Alert, Typography, Layout } from 'antd';
import { JsonValidator } from './services/JsonValidator';

const { TextArea } = Input;
const { Title, Paragraph } = Typography;
const { Header, Content, Footer } = Layout;

const App = () => {
    const [jsonInput, setJsonInput] = useState('');
    const [validationResult, setValidationResult] = useState(null);

    useEffect(() => {
        const savedJson = localStorage.getItem('jsonInput');
        if (savedJson) {
            setJsonInput(savedJson);
            setValidationResult(JsonValidator.validate(savedJson));
        }
    }, []);

    const handleValidate = useCallback(() => {
        const result = JsonValidator.validate(jsonInput);
        setValidationResult(result);
        localStorage.setItem('jsonInput', jsonInput);
    }, [jsonInput]);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header>
                <Title style={{ color: 'white', textAlign: 'center', margin: '16px 0' }}>JSON Validator</Title>
            </Header>
            <Content style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
                <Paragraph>
                    Welcome to the JSON Validator. Please enter your JSON in the text area below and click "Validate JSON" to check if it's valid.
                </Paragraph>
                <Title level={2}>Instructions</Title>
                <Paragraph>
                    <ol>
                        <li>Enter your JSON data in the text area provided.</li>
                        <li>Click the "Validate JSON" button to validate your JSON.</li>
                        <li>If your JSON is valid, a success message will be displayed.</li>
                        <li>If there are errors in your JSON, an error message will be displayed with details.</li>
                    </ol>
                </Paragraph>
                <TextArea
                    rows={10}
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    placeholder="Enter your JSON here"
                    style={{ marginBottom: '10px' }}
                />
                <Button type="primary" onClick={handleValidate} style={{ marginBottom: '10px' }}>
                    Validate JSON
                </Button>
                {validationResult && (
                    <div style={{ marginTop: '20px' }}>
                        {validationResult.isValid ? (
                            <Alert message="JSON is valid" type="success" />
                        ) : (
                            <Alert message={`Error: ${validationResult.error}`} type="error" />
                        )}
                    </div>
                )}
            </Content>
            <Footer style={{ textAlign: 'center' }}>JSON Validator ©2024</Footer>
        </Layout>
    );
};

export default React.memo(App);