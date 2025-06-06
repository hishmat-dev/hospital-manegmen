
import { Save, X, Loader2 } from "lucide-react"

export default function Btn({ onSave, onCancel, loading, disabled }) {
  return (
    <div className="flex space-x-4 pt-6 border-t">
      <button
        type="submit"
        onClick={onSave}
        disabled={disabled || loading}
        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            <span>Recording...</span>
          </>
        ) : (
          <>
            <Save size={16} />
            <span>Record Vitals</span>
          </>
        )}
      </button>

      <button
        type="button"
        onClick={onCancel}
        disabled={loading}
        className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 disabled:opacity-50 flex items-center space-x-2"
      >
        <X size={16} />
        <span>Cancel</span>
      </button>
    </div>
  )
}
