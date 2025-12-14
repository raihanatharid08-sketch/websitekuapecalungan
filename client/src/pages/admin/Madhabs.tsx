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
        // Update existing madhab
        const { error } = await supabase
          .from("madhabs")
          .update({
            name: formData.name,
            description: formData.description || null,
          })
          .eq("id", editingMadhab.id);

        if (error) throw error;
        toast.success("Madhab berhasil diupdate");
      } else {
        // Create new madhab
        const { error } = await supabase
          .from("madhabs")
          .insert({
            name: formData.name,
            description: formData.description || null,
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

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus madhab ini?")) return;

    try {
      const { error } = await supabase
        .from("madhabs")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast.success("Madhab berhasil dihapus");
      loadMadhabs();
    } catch (error) {
      console.error("Error deleting madhab:", error);
      toast.error("Gagal menghapus madhab");
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setEditingMadhab(null);
    setFormData({ name: "", description: "" });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Memuat madhab...</p>
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
                  <Label htmlFor="name">Nama Madhab *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Contoh: Syafi'i, Hanafi, Maliki, Hanbali"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Deskripsi</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Deskripsi singkat tentang madhab ini"
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleDialogClose}>
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
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="font-semibold text-lg mb-2">Belum Ada Madhab</h3>
            <p className="text-muted-foreground text-center mb-4">
              Mulai dengan menambahkan madhab pertama untuk referensi jawaban fiqih
            </p>
            <Button onClick={() => setDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Tambah Madhab Pertama
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
                    onClick={() => handleDelete(madhab.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
