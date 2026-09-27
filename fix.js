import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix React unused imports
  content = content.replace(/import React(?:, \{[^}]+\})? from 'react';\n?/g, (match) => {
    if (match.includes('{')) {
      const parts = match.match(/\{([^}]+)\}/);
      if (parts) return `import { ${parts[1]} } from 'react';\n`;
    }
    return '';
  });
  
  // Fix ReactNode import
  content = content.replace(/import \{ ReactNode \} from 'react';/g, "import type { ReactNode } from 'react';");

  // Fix types import
  content = content.replace(/import \{([^}]+)\} from '([^']+types\/telemetry)';/g, "import type { $1 } from '$2';");

  // Fix LucideIcon import
  content = content.replace(/import \{([^}]*LucideIcon[^}]*)\} from 'lucide-react';/g, "import type { $1 } from 'lucide-react';");

  // Specific fixes
  if (filePath.includes('MetricCard.tsx')) {
    content = content.replace(/const getStatusColor = \(\) => \{[\s\S]*?\};\n\n/g, '');
  }
  if (filePath.includes('StatusOverviewCard.tsx')) {
    content = content.replace(/import \{ Badge \} from '\.\.\/common\/Badge';\n/g, '');
  }
  if (filePath.includes('SafetyInterlock.tsx')) {
    content = content.replace(/const \[interlock, setInterlock\]/g, 'const [interlock]');
  }
  if (filePath.includes('EnvironmentView.tsx')) {
     content = content.replace(/import type \{ TelemetryData, HardwareStatus as HardwareStatusType, Alert \} from '\.\.\/\.\.\/types\/telemetry';/g, "import type { TelemetryData, Alert } from '../../types/telemetry';");
     content = content.replace(/import \{ TelemetryData, HardwareStatus as HardwareStatusType, Alert \} from '\.\.\/\.\.\/types\/telemetry';/g, "import type { TelemetryData, Alert } from '../../types/telemetry';");
  }

  fs.writeFileSync(filePath, content);
}

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
      walk(full);
    } else if (full.endsWith('.ts') || full.endsWith('.tsx')) {
      processFile(full);
    }
  }
}

walk(path.join(__dirname, 'src'));
console.log('Done');
