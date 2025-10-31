import { useState } from "react";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import type { AssessmentSection, AssessmentQuestion } from "@shared/schema";
import { nanoid } from "nanoid";

interface AssessmentBuilderProps {
  sections: AssessmentSection[];
  onSectionsChange: (sections: AssessmentSection[]) => void;
}

const questionTypes = [
  { value: "single", label: "Single Choice" },
  { value: "multiple", label: "Multiple Choice" },
  { value: "short_text", label: "Short Text" },
  { value: "long_text", label: "Long Text" },
  { value: "numeric", label: "Numeric" },
  { value: "file", label: "File Upload" },
];

export function AssessmentBuilder({ sections, onSectionsChange }: AssessmentBuilderProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(sections[0]?.id || null);

  const addSection = () => {
    const newSection: AssessmentSection = {
      id: nanoid(),
      title: "New Section",
      questions: [],
    };
    onSectionsChange([...sections, newSection]);
    setExpandedSection(newSection.id);
  };

  const updateSection = (sectionId: string, updates: Partial<AssessmentSection>) => {
    onSectionsChange(
      sections.map((s) => (s.id === sectionId ? { ...s, ...updates } : s))
    );
  };

  const deleteSection = (sectionId: string) => {
    onSectionsChange(sections.filter((s) => s.id !== sectionId));
  };

  const addQuestion = (sectionId: string) => {
    const section = sections.find((s) => s.id === sectionId);
    if (!section) return;

    const newQuestion: AssessmentQuestion = {
      id: nanoid(),
      type: "short_text",
      question: "New Question",
      required: false,
    };

    updateSection(sectionId, {
      questions: [...section.questions, newQuestion],
    });
  };

  const updateQuestion = (
    sectionId: string,
    questionId: string,
    updates: Partial<AssessmentQuestion>
  ) => {
    const section = sections.find((s) => s.id === sectionId);
    if (!section) return;

    updateSection(sectionId, {
      questions: section.questions.map((q) =>
        q.id === questionId ? { ...q, ...updates } : q
      ),
    });
  };

  const deleteQuestion = (sectionId: string, questionId: string) => {
    const section = sections.find((s) => s.id === sectionId);
    if (!section) return;

    updateSection(sectionId, {
      questions: section.questions.filter((q) => q.id !== questionId),
    });
  };

  return (
    <div className="space-y-4" data-testid="assessment-builder">
      {sections.map((section) => (
        <Card key={section.id}>
          <CardHeader className="flex flex-row items-center gap-3 space-y-0">
            <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
            <Input
              value={section.title}
              onChange={(e) => updateSection(section.id, { title: e.target.value })}
              className="flex-1 font-semibold"
              data-testid={`input-section-title-${section.id}`}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => deleteSection(section.id)}
              data-testid={`button-delete-section-${section.id}`}
              className="h-8 w-8"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardHeader>
          
          {expandedSection === section.id && (
            <CardContent className="space-y-4">
              {section.questions.map((question) => (
                <Card key={question.id} className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab mt-2" />
                      <div className="flex-1 space-y-3">
                        <div>
                          <Label>Question</Label>
                          <Input
                            value={question.question}
                            onChange={(e) =>
                              updateQuestion(section.id, question.id, {
                                question: e.target.value,
                              })
                            }
                            data-testid={`input-question-${question.id}`}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label>Type</Label>
                            <Select
                              value={question.type}
                              onValueChange={(value) =>
                                updateQuestion(section.id, question.id, {
                                  type: value as any,
                                })
                              }
                            >
                              <SelectTrigger data-testid={`select-question-type-${question.id}`}>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {questionTypes.map((type) => (
                                  <SelectItem key={type.value} value={type.value}>
                                    {type.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="flex items-center gap-2 pt-8">
                            <Checkbox
                              checked={question.required}
                              onCheckedChange={(checked) =>
                                updateQuestion(section.id, question.id, {
                                  required: checked as boolean,
                                })
                              }
                              data-testid={`checkbox-required-${question.id}`}
                            />
                            <Label>Required</Label>
                          </div>
                        </div>

                        {(question.type === "single" || question.type === "multiple") && (
                          <div>
                            <Label>Options (comma-separated)</Label>
                            <Input
                              value={question.options?.join(", ") || ""}
                              onChange={(e) =>
                                updateQuestion(section.id, question.id, {
                                  options: e.target.value.split(",").map((o) => o.trim()),
                                })
                              }
                              placeholder="Option 1, Option 2, Option 3"
                              data-testid={`input-options-${question.id}`}
                            />
                          </div>
                        )}

                        {question.type === "numeric" && (
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <Label>Min Value</Label>
                              <Input
                                type="number"
                                value={question.minValue || ""}
                                onChange={(e) =>
                                  updateQuestion(section.id, question.id, {
                                    minValue: parseInt(e.target.value),
                                  })
                                }
                                data-testid={`input-min-${question.id}`}
                              />
                            </div>
                            <div>
                              <Label>Max Value</Label>
                              <Input
                                type="number"
                                value={question.maxValue || ""}
                                onChange={(e) =>
                                  updateQuestion(section.id, question.id, {
                                    maxValue: parseInt(e.target.value),
                                  })
                                }
                                data-testid={`input-max-${question.id}`}
                              />
                            </div>
                          </div>
                        )}

                        {question.type === "long_text" && (
                          <div>
                            <Label>Max Length</Label>
                            <Input
                              type="number"
                              value={question.maxLength || ""}
                              onChange={(e) =>
                                updateQuestion(section.id, question.id, {
                                  maxLength: parseInt(e.target.value),
                                })
                              }
                              placeholder="e.g., 500"
                              data-testid={`input-max-length-${question.id}`}
                            />
                          </div>
                        )}

                        <div className="border-t pt-3 mt-3">
                          <Label className="text-xs text-muted-foreground">Conditional Logic (optional)</Label>
                          <div className="grid grid-cols-2 gap-3 mt-2">
                            <div>
                              <Label className="text-xs">Show if Question ID equals</Label>
                              <Input
                                value={question.showIfQuestionId || ""}
                                onChange={(e) =>
                                  updateQuestion(section.id, question.id, {
                                    showIfQuestionId: e.target.value || undefined,
                                  })
                                }
                                placeholder="Question ID"
                                data-testid={`input-show-if-question-${question.id}`}
                              />
                            </div>
                            <div>
                              <Label className="text-xs">Value</Label>
                              <Input
                                value={question.showIfEquals || ""}
                                onChange={(e) =>
                                  updateQuestion(section.id, question.id, {
                                    showIfEquals: e.target.value || undefined,
                                  })
                                }
                                placeholder="e.g., Yes"
                                data-testid={`input-show-if-equals-${question.id}`}
                              />
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            This question will only appear if the specified question has the given value.
                          </p>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteQuestion(section.id, question.id)}
                        data-testid={`button-delete-question-${question.id}`}
                        className="h-8 w-8"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}

              <Button
                variant="outline"
                className="w-full"
                onClick={() => addQuestion(section.id)}
                data-testid={`button-add-question-${section.id}`}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Question
              </Button>
            </CardContent>
          )}
        </Card>
      ))}

      <Button
        variant="outline"
        className="w-full"
        onClick={addSection}
        data-testid="button-add-section"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Section
      </Button>
    </div>
  );
}
