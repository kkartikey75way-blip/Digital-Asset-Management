import {
    useLazyExportAssetsCSVQuery,
    useLazyExportAssetsPDFQuery,
} from "../../services/assetApi";
import Button from "../ui/Button";
import { showError } from "../../utils/toast";

const ExportButtons = () => {
    const [exportCSV] = useLazyExportAssetsCSVQuery();
    const [exportPDF] = useLazyExportAssetsPDFQuery();

    const downloadFile = (
        blob: Blob,
        filename: string
    ) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        link.click();
        window.URL.revokeObjectURL(url);
    };

    const handleCSV = async () => {
        try {
            const blob = await exportCSV().unwrap();
            downloadFile(blob, "assets-report.csv");
        } catch {
            showError("Failed to export CSV");
        }
    };

    const handlePDF = async () => {
        try {
            const blob = await exportPDF().unwrap();
            downloadFile(blob, "assets-report.pdf");
        } catch {
            showError("Failed to export PDF");
        }
    };

    return (
        <div className="flex gap-3">
            <Button
                type="button"
                label="Export CSV"
                onClick={handleCSV}
            />

            <Button
                type="button"
                label="Export PDF"
                onClick={handlePDF}
            />
        </div>
    );
};

export default ExportButtons;
