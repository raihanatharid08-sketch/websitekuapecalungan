import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase";
import { Users, Edit, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ConfirmDialog from "@/components/ConfirmDialog";
import EmptyState from "@/components/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";

interface Madhab {
  id: number;
  name: string;
  description: string | null;
  created_at: string;
}

export default function AdminMadhabs() {
  const [madhabs, setMadhabs] = useState<Madhab[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingMadhab, setEditingMadhab] = useState<Madhab | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    loadMadhabs();
  }, []);

  const loadMadhabs = async () => {
    try {
      const { data, error } = await supabase
        .from("madhabs")
        .select("*")
        .order("name");

      if (error) throw error;
      setMadhabs(data || []);
    } catch (error) {
      console.error("Error loading madhabs:", error);
      toast.error("Gagal memuat madhab");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingMadhab) {
        const { error } = await supabase
          .from("madhabs")
          .update({
            name: formData.name,
            description: formData.description,
          })
          .eq("id", editingMadhab.id);

        if (error) throw error;
        toast.success("Madhab berhasil diperbarui");
      } else {
        const { error } = await supabase
          .from("madhabs")
          .insert({
            name: formData.name,
            description: formData.description,
          });

        if (error) throw error;
        toast.success("Madhab berhasil ditambahkan");
      }

      setDialogOpen(false);
      setFormData({ name: "", description: "" });
      setEditingMadhab(null);
      loadMadhabs();
    } catch (error) {
      console.error("Error saving madhab:", error);
      toast.error("Gagal menyimpan madhab");
    }
  };

  const handleEdit = (madhab: Madhab) => {
    setEditingMadhab(madhab);
    setFormData({
      name: madhab.name,
      description: madhab.description || "",
    });
    setDialogOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    setDeletingId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingId) return;

    try {
      const { error } = await supabase
        .from("madhabs")
        .delete()
        .eq("id", deletingId);

      if (error) throw error;
      toast.success("Madhab berhasil dihapus");
      loadMadhabs();
    } catch (error) {
      console.error("Error deleting madhab:", error);
      toast.error("Gagal menghapus madhab");
    } finally {
      setDeleteDialogOpen(false);
      setDeletingId(null);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setEditingMadhab(null);
    setFormData({ name: "", description: "" });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-10 w-64 mb-2" />
          <Skeleton className="h-5 w-96" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-full mt-2" />
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Skeleton className="h-9 flex-1" />
                  <Skeleton className="h-9 w-9" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold mb-2">Kelola Madhab</h1>
          <p className="text-muted-foreground">
            Tambah, edit, atau hapus madhab dalam Islam
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingMadhab(null)}>
              <Plus className="mr-2 h-4 w-4" />
              Tambah Madhab
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>
                  {editingMadhab ? "Edit Madhab" : "Tambah Madhab Baru"}
                </DialogTitle>
                <DialogDescription>
                  {editingMadhab
                    ? "Ubah informasi madhab di bawah ini"
                    : "Masukkan informasi madhab baru"}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Madhab</Label>
                  <Input
                    id="name"
                    placeholder="Contoh: Hanafi"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Deskripsi</Label>
                  <Textarea
                    id="description"
                    placeholder="Deskripsi madhab..."
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={4}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleDialogClose}
                >
                  Batal
                </Button>
                <Button type="submit">
                  {editingMadhab ? "Simpan Perubahan" : "Tambah Madhab"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Madhabs List */}
      {madhabs.length === 0 ? (
        <EmptyState
          icon={Users}
          title="Belum Ada Madhab"
          description="Mulai dengan menambahkan madhab pertama untuk referensi hukum Islam"
          action={{
            label: "Tambah Madhab Pertama",
            onClick: () => setDialogOpen(true),
          }}
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {madhabs.map((madhab) => (
            <Card key={madhab.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Users className="h-4 w-4 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{madhab.name}</CardTitle>
                  </div>
                </div>
                {madhab.description && (
                  <CardDescription className="mt-2">
                    {madhab.description}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleEdit(madhab)}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleDeleteClick(madhab.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Hapus Madhab"
        description="Apakah Anda yakin ingin menghapus madhab ini? Tindakan ini tidak dapat dibatalkan."
        confirmText="Hapus"
        cancelText="Batal"
        onConfirm={handleDeleteConfirm}
        variant="destructive"
      />
    </div>
  );
}
