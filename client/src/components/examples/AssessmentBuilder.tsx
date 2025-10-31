import { useState } from 'react';
import { AssessmentBuilder } from '../assessment-builder';
import { AssessmentPreview } from '../assessment-preview';
import type { AssessmentSection } from '@shared/schema';
import { nanoid } from 'nanoid';

export default function AssessmentBuilderExample() {
  const [sections, setSections] = useState<AssessmentSection[]>([
    {
      id: nanoid(),
      title: 'Background Information',
      questions: [
        {
          id: nanoid(),
          type: 'short_text',
          question: 'What is your current role?',
          required: true,
        },
        {
          id: nanoid(),
          type: 'numeric',
          question: 'Years of experience',
          required: true,
          minValue: 0,
          maxValue: 50,
        },
      ],
    },
  ]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Builder</h2>
        <AssessmentBuilder sections={sections} onSectionsChange={setSections} />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4">Preview</h2>
        <AssessmentPreview sections={sections} title="Technical Assessment" />
      </div>
    </div>
  );
}
