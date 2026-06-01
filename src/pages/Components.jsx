import { useState } from "react";
import Container from "../components/Container";
import Button from "../components/Button";
import Badge from "../components/Badge";
import Avatar from "../components/Avatar";
import Card from "../components/Card";
import ProductCard from "../components/ProductCard";
import Table from "../components/Table";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import Modal from "../components/Modal";
import KanbanCard from "../components/KanbanCard";
import ActivityTimeline from "../components/ActivityTimeline";

export default function Components() {
  const [modalOpen, setModalOpen] = useState(false);

  const tableHeaders = [
    "Order ID",
    "Customer",
    "Menu Item",
    "Amount",
    "Status",
  ];
  const tableData = [
    {
      id: "#0021",
      name: "Budi Santoso",
      item: "Spicy Ramen Extra",
      total: "Rp 45.000",
      status: "Completed",
    },
    {
      id: "#0022",
      name: "Siti Rahma",
      item: "Honey Garlic Chicken",
      total: "Rp 52.000",
      status: "Pending",
    },
  ];

  const timelineData = [
    {
      title: "New Order Confirmed",
      time: "2 mins ago",
      description: "Order #0023 placed by Jessica",
    },
    {
      title: "Payment Verified",
      time: "10 mins ago",
      description: "Payment for Order #0022 has been settled",
    },
  ];

  return (
    <Container className="space-y-10 pb-20">
      <div>
        <h1 className="text-2xl font-black text-gray-800">
          Contoh Component
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Sistem komponen terintegrasi untuk On-Catering.
        </p>
      </div>

      <section className="space-y-4">   
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          1. Basic Components
        </h2>
        <Card className="flex flex-wrap items-center gap-4">
          <Button type="primary">Primary Button</Button>
          <Button type="secondary">Secondary</Button>
          <Button type="success">Success Action</Button>
          <Button type="danger">Danger</Button>
          <div className="flex gap-2">
            <Badge type="primary">Active</Badge>
            <Badge type="warning">Pending</Badge>
            <Badge type="success">Delivered</Badge>
            <Badge type="danger">Cancelled</Badge>
          </div>
          <div className="flex gap-2">
            <Avatar name="O" />
            <Avatar name="Z" />
            <Avatar name="A" />
          </div>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          2. Form Components & Modal
        </h2>
        <Card className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <InputField
            label="Customer Email"
            type="email"
            placeholder="enter your email address"
          />
          <SelectField
            label="Filter Category"
            options={[
              { value: "all", label: "All Items" },
              { value: "food", label: "Foods Only" },
              { value: "beverage", label: "Beverages" },
            ]}
          />
          <Button type="primary" onClick={() => setModalOpen(true)}>
            Open Interaction Modal
          </Button>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          3. Data Display & CRM Cards
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ProductCard
            image="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
            title="Salmon Avocado Salad"
            category="Healthy Food"
            price="Rp 68.000"
            description="Fresh Atlantic salmon with organic sliced avocado, cherry tomatoes, and honey mustard dressing."
          />
          <div>
            <h3 className="text-sm font-semibold text-gray-600 mb-3">
              Kanban Pipeline Component
            </h3>
            <KanbanCard
              id="#ORD-9882"
              title="3x Wagyu Beef Burger"
              customer="Ahmad Dhani"
              total="Rp 210.000"
              status="Progress"
            />
            <KanbanCard
              id="#ORD-9881"
              title="1x Iced Matcha Latte"
              customer="Clara"
              total="Rp 28.000"
              status="Pending"
            />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-600 mb-3">
              Recent Activity Timeline
            </h3>
            <Card>
              <ActivityTimeline activities={timelineData} />
            </Card>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          4. Complex Table Component
        </h2>
        <Table headers={tableHeaders}>
          {tableData.map((row, idx) => (
            <tr key={idx} className="hover:bg-gray-50/80 transition-colors">
              <td className="px-6 py-4 font-medium text-gray-900">{row.id}</td>
              <td className="px-6 py-4 text-gray-700">{row.name}</td>
              <td className="px-6 py-4 text-gray-600">{row.item}</td>
              <td className="px-6 py-4 font-bold text-gray-900">{row.total}</td>
              <td className="px-6 py-4">
                <Badge
                  type={row.status === "Completed" ? "success" : "warning"}
                >
                  {row.status}
                </Badge>
              </td>
            </tr>
          ))}
        </Table>
      </section>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Create New CRM Data record"
      >
        <div className="space-y-4">
          <InputField label="Full Name" placeholder="e.g. John Doe" />
          <InputField label="Phone Number" placeholder="e.g. 0812345678" />
        </div>
      </Modal>
    </Container>
  );
}
