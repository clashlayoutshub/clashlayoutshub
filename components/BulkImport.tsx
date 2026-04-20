'use client';

import { useState, useRef, useEffect } from 'react';
import { Upload, FileText, AlertCircle, Check, X, Clock, Play, Pause, Bell } from 'lucide-react';

interface BulkImportProps {
  onImportComplete?: (results: any) => void;
}

interface LayoutRow {
  type: string;
  level: number;
  category: string;
  baseLink?: string;
  image?: string;
}

interface ImportLog {
  type: 'success' | 'error';
  message: string;
  timestamp: Date;
}

export default function BulkImport({ onImportComplete }: BulkImportProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [currentLayout, setCurrentLayout] = useState<LayoutRow | null>(null);
  const [logs, setLogs] = useState<ImportLog[]>([]);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [error, setError] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const processingRef = useRef<LayoutRow[]>([]);

  // Request notification permission on mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  // Countdown timer
  useEffect(() => {
    if (countdown > 0 && !isPaused) {
      intervalRef.current = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [countdown, isPaused]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== 'text/csv' && !selectedFile.name.endsWith('.csv')) {
        setError('Please select a CSV file');
        setFile(null);
        return;
      }
      setFile(selectedFile);
      setError(null);
      setLogs([]);
      setProgress({ current: 0, total: 0 });
      setIsComplete(false);
    }
  };

  const parseCSV = (csvText: string): LayoutRow[] => {
    const lines = csvText.split('\n').filter(line => line.trim());
    if (lines.length === 0) return [];

    const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/[^a-z0-9]/g, ''));
    const rows: LayoutRow[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      if (values.length !== headers.length) continue;

      const row: any = {};
      headers.forEach((header, index) => {
        row[header] = values[index];
      });

      rows.push({
        type: row.type || 'th',
        level: parseInt(row.level || row.townhall || row.builderhall),
        category: row.category || 'war',
        baseLink: row.baselink || row.link || '',
        image: row.image || row.imageurl || '',
      });
    }

    return rows;
  };

  const addLog = (type: 'success' | 'error', message: string) => {
    setLogs(prev => [...prev, { type, message, timestamp: new Date() }]);
  };

  const processLayout = async (layout: LayoutRow) => {
    try {
      const response = await fetch('/api/admin/bulk-import-single', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: layout.type,
          level: layout.level,
          category: layout.category,
          baseLink: layout.baseLink,
          image: layout.image,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }

      const data = await response.json();
      const typeLabel = layout.type === 'th' ? 'TH' : 'BH';
      addLog('success', `${typeLabel}${layout.level} ${layout.category} base successfully uploaded. Total: ${progress.current + 1}/${progress.total}`);
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      const typeLabel = layout.type === 'th' ? 'TH' : 'BH';
      addLog('error', `${typeLabel}${layout.level} ${layout.category} base failed: ${message}`);
      return false;
    }
  };

  const processNextLayout = async () => {
    if (processingRef.current.length === 0 || isPaused) {
      setIsProcessing(false);
      if (processingRef.current.length === 0) {
        setIsComplete(true);
        if (onImportComplete) {
          onImportComplete({ current: progress.current, total: progress.total, logs });
        }
        // Send browser notification
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification('Bulk Import Complete', {
            body: `Successfully imported ${progress.current} layouts`,
            icon: '/favicon.ico',
          });
        }
      }
      return;
    }

    const layout = processingRef.current.shift();
    setCurrentLayout(layout ?? null);
    setProgress(prev => ({ ...prev, current: prev.current + 1 }));

    if (!layout) {
      processNextLayout();
      return;
    }

    const success = await processLayout(layout);

    // Wait for 60 seconds total (including processing time)
    setCountdown(60);
    await new Promise(resolve => setTimeout(resolve, 60000));
    setCountdown(0);

    processNextLayout();
  };

  const handleStart = async () => {
    if (!file) return;

    try {
      const fileContent = await file.text();
      const rows = parseCSV(fileContent);

      if (rows.length === 0) {
        setError('No valid data found in CSV');
        return;
      }

      processingRef.current = rows;
      setProgress({ current: 0, total: rows.length });
      setIsProcessing(true);
      setError(null);
      setLogs([]);
      setIsComplete(false);

      processNextLayout();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to parse CSV';
      setError(message);
    }
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
    if (!isPaused && countdown > 0) {
      // Resume countdown
    }
  };

  const handleCancel = () => {
    setIsProcessing(false);
    setIsPaused(false);
    setCountdown(0);
    setCurrentLayout(null);
    setFile(null);
    setError(null);
    setLogs([]);
    setProgress({ current: 0, total: 0 });
    setIsComplete(false);
    processingRef.current = [];
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const percentage = progress.total > 0 ? Math.round((progress.current / progress.total) * 100) : 0;

  return (
    <div className="bg-brand-card border border-brand-border rounded-xl p-6">
      <h3 className="text-lg font-bold text-brand-text mb-4 flex items-center gap-2">
        <Upload className="w-5 h-5 text-primary" />
        Bulk Import Layouts (Slow & Steady)
      </h3>

      <div className="space-y-4">
        {/* File Upload Area */}
        {!isProcessing && (
          <div
            className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
              file
                ? 'border-primary bg-blue-50'
                : 'border-brand-border hover:border-primary hover:bg-blue-50 cursor-pointer'
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileSelect}
              className="hidden"
            />
            
            {file ? (
              <div className="space-y-2">
                <FileText className="w-12 h-12 mx-auto text-primary" />
                <p className="text-brand-text font-medium">{file.name}</p>
                <p className="text-sm text-brand-muted">{(file.size / 1024).toFixed(2)} KB</p>
              </div>
            ) : (
              <div className="space-y-2">
                <Upload className="w-12 h-12 mx-auto text-brand-muted" />
                <p className="text-brand-text font-medium">Click to upload CSV</p>
                <p className="text-sm text-brand-muted">or drag and drop</p>
              </div>
            )}
          </div>
        )}

        {/* Processing Dashboard */}
        {isProcessing && (
          <div className="space-y-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            {/* Progress Overview */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-brand-text">
                  Processing: {progress.current} / {progress.total} layouts ({percentage}%)
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handlePause}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-white border border-brand-border rounded-lg hover:bg-gray-50 transition-all"
                >
                  {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                  {isPaused ? 'Resume' : 'Pause'}
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-red-100 text-red-700 border border-red-200 rounded-lg hover:bg-red-200 transition-all"
                >
                  <X className="w-3.5 h-3.5" /> Cancel
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${percentage}%` }}
              />
            </div>

            {/* Countdown Timer */}
            {countdown > 0 && (
              <div className="flex items-center gap-2 text-sm text-brand-muted">
                <Clock className="w-4 h-4" />
                <span>Next upload in {countdown}s...</span>
              </div>
            )}

            {isPaused && (
              <div className="flex items-center gap-2 text-sm text-amber-600">
                <Pause className="w-4 h-4" />
                <span>Import paused. Resume to continue.</span>
              </div>
            )}

            {/* Current Layout */}
            {currentLayout && !isPaused && (
              <div className="text-sm text-brand-text">
                <span className="font-medium">Current:</span> {currentLayout.type.toUpperCase()}{currentLayout.level} {currentLayout.category} base
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        {file && !isProcessing && (
          <div className="flex gap-2">
            <button
              onClick={handleStart}
              className="flex-1 flex items-center justify-center gap-2 bg-primary text-white font-semibold py-2.5 px-4 rounded-xl hover:bg-primary-dark transition-all"
            >
              <Play className="w-4 h-4" />
              Start Import (1 layout/min)
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center justify-center gap-2 bg-gray-200 text-brand-text font-semibold py-2.5 px-4 rounded-xl hover:bg-gray-300 transition-all"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-xl">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Import Log */}
        {(logs.length > 0 || isComplete) && (
          <div className="space-y-3 p-4 bg-gray-50 border border-gray-200 rounded-xl max-h-64 overflow-y-auto">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-brand-text flex items-center gap-2">
                <Bell className="w-4 h-4" />
                Import Log
              </h4>
              {isComplete && (
                <span className="text-sm text-green-600 font-medium">Complete</span>
              )}
            </div>
            <div className="space-y-1 text-xs">
              {logs.map((log, idx) => (
                <div key={idx} className={`flex items-start gap-2 ${log.type === 'success' ? 'text-green-700' : 'text-red-700'}`}>
                  {log.type === 'success' ? <Check className="w-3 h-3 flex-shrink-0 mt-0.5" /> : <AlertCircle className="w-3 h-3 flex-shrink-0 mt-0.5" />}
                  <span>{log.message}</span>
                </div>
              ))}
              {logs.length === 0 && isComplete && (
                <p className="text-brand-muted">No layouts processed yet.</p>
              )}
            </div>
          </div>
        )}

        {/* CSV Format Instructions */}
        {!isProcessing && (
          <div className="text-xs text-brand-muted border-t border-brand-border pt-4">
            <p className="font-semibold mb-2">CSV Format:</p>
            <code className="block bg-gray-100 p-2 rounded text-xs">
              type,level,category,baseLink,imageUrl
            </code>
            <p className="mt-2">Example: th,14,war,https://link.com,https://image.com</p>
            <p className="mt-2 text-amber-600">
              <strong>Note:</strong> Processes exactly 1 layout per minute to avoid API limits.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
