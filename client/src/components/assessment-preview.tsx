import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import type { AssessmentSection } from "@shared/schema";

interface AssessmentPreviewProps {
  sections: AssessmentSection[];
  title?: string;
}

export function AssessmentPreview({ sections, title = "Assessment Preview" }: AssessmentPreviewProps) {
  const [responses, setResponses] = useState<Record<string, any>>({});

  const updateResponse = (questionId: string, value: any) => {
    setResponses((prev) => ({ ...prev, [questionId]: value }));
  };

  return (
    <div className="space-y-6 sticky top-8 max-h-screen overflow-y-auto" data-testid="assessment-preview">
      <div className="bg-muted/30 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-sm text-muted-foreground">
          This is how candidates will see the assessment
        </p>
      </div>

      {sections.map((section) => (
        <Card key={section.id}>
          <CardHeader>
            <h3 className="text-lg font-semibold">{section.title}</h3>
          </CardHeader>
          <CardContent className="space-y-6">
            {section.questions.map((question) => (
              <div key={question.id} className="space-y-2">
                <Label>
                  {question.question}
                  {question.required && <span className="text-destructive ml-1">*</span>}
                </Label>

                {question.type === "single" && question.options && (
                  <RadioGroup
                    value={responses[question.id] || ""}
                    onValueChange={(value) => updateResponse(question.id, value)}
                  >
                    {question.options.map((option, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <RadioGroupItem value={option} id={`${question.id}-${idx}`} />
                        <Label htmlFor={`${question.id}-${idx}`} className="font-normal">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}

                {question.type === "multiple" && question.options && (
                  <div className="space-y-2">
                    {question.options.map((option, idx) => {
                      const selected = responses[question.id] || [];
                      return (
                        <div key={idx} className="flex items-center gap-2">
                          <Checkbox
                            checked={selected.includes(option)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                updateResponse(question.id, [...selected, option]);
                              } else {
                                updateResponse(
                                  question.id,
                                  selected.filter((o: string) => o !== option)
                                );
                              }
                            }}
                            id={`${question.id}-${idx}`}
                          />
                          <Label htmlFor={`${question.id}-${idx}`} className="font-normal">
                            {option}
                          </Label>
                        </div>
                      );
                    })}
                  </div>
                )}

                {question.type === "short_text" && (
                  <Input
                    value={responses[question.id] || ""}
                    onChange={(e) => updateResponse(question.id, e.target.value)}
                    placeholder="Your answer"
                  />
                )}

                {question.type === "long_text" && (
                  <Textarea
                    value={responses[question.id] || ""}
                    onChange={(e) => updateResponse(question.id, e.target.value)}
                    placeholder="Your answer"
                    rows={4}
                    maxLength={question.maxLength}
                  />
                )}

                {question.type === "numeric" && (
                  <Input
                    type="number"
                    value={responses[question.id] || ""}
                    onChange={(e) => updateResponse(question.id, e.target.value)}
                    min={question.minValue}
                    max={question.maxValue}
                    placeholder="Enter a number"
                  />
                )}

                {question.type === "file" && (
                  <Input
                    type="file"
                    onChange={(e) => updateResponse(question.id, e.target.files?.[0])}
                  />
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      ))}

      <Button className="w-full" onClick={() => console.log("Submit:", responses)}>
        Submit Assessment
      </Button>
    </div>
  );
}
