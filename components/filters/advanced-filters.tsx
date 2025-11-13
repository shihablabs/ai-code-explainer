import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { FilterState } from "@/types";

interface AdvancedFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  explanationStyle: string;
  onExplanationStyleChange: (style: string) => void;
  includeExamples: boolean;
  onIncludeExamplesChange: (include: boolean) => void;
  language: string;
  onLanguageChange: (language: string) => void;
}

export function AdvancedFilters({
  filters,
  onFiltersChange,
  explanationStyle,
  onExplanationStyleChange,
  includeExamples,
  onIncludeExamplesChange,
  language,
  onLanguageChange,
}: AdvancedFiltersProps) {
  return (
    <div className="space-y-6 p-6 border rounded-lg bg-background shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="space-y-3">
          <Label htmlFor="language" className="text-sm font-medium">
            Language
          </Label>
          <Select value={language} onValueChange={onLanguageChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="bengali">Bengali</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">Explanation language</p>
        </div>

        <div className="space-y-3">
          <Label htmlFor="programming-language" className="text-sm font-medium">
            Programming Language
          </Label>
          <Select
            value={filters.programmingLanguage}
            onValueChange={(value) =>
              onFiltersChange({ ...filters, programmingLanguage: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Auto Detect" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="auto">Auto Detect</SelectItem>
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="java">Java</SelectItem>
              <SelectItem value="cpp">C++</SelectItem>
              <SelectItem value="react">React</SelectItem>
              <SelectItem value="html">HTML/CSS</SelectItem>
              <SelectItem value="sql">SQL</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label htmlFor="explanation-depth" className="text-sm font-medium">
            Explanation Depth
          </Label>
          <Select
            value={filters.explanationDepth}
            onValueChange={(value: "basic" | "intermediate" | "advanced") =>
              onFiltersChange({ ...filters, explanationDepth: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select depth" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="basic">Basic (Simple)</SelectItem>
              <SelectItem value="intermediate">
                Intermediate (Detailed)
              </SelectItem>
              <SelectItem value="advanced">Advanced (Deep Dive)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label htmlFor="target-audience" className="text-sm font-medium">
            Target Audience
          </Label>
          <Select
            value={filters.targetAudience}
            onValueChange={(value: "student" | "developer" | "senior") =>
              onFiltersChange({ ...filters, targetAudience: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select audience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="student">Student</SelectItem>
              <SelectItem value="developer">Developer</SelectItem>
              <SelectItem value="senior">Senior Developer</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
        <div className="space-y-3">
          <Label htmlFor="explanation-style" className="text-sm font-medium">
            Explanation Style
          </Label>
          <Select
            value={explanationStyle}
            onValueChange={onExplanationStyleChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="detailed">Detailed</SelectItem>
              <SelectItem value="concise">Concise</SelectItem>
              <SelectItem value="beginner">Beginner Friendly</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between space-x-2 pt-6">
          <div className="space-y-0.5">
            <Label
              htmlFor="include-examples"
              className="text-sm font-medium cursor-pointer"
            >
              Include Examples
            </Label>
            <p className="text-xs text-muted-foreground">
              Add practical examples
            </p>
          </div>
          <Switch
            id="include-examples"
            checked={includeExamples}
            onCheckedChange={onIncludeExamplesChange}
          />
        </div>
      </div>
    </div>
  );
}
